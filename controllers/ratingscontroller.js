const express = require('express');
const router = express.Router();
const {Pie} = require('../models');
const validateSession = require('../middleware/validateSession');

router.get('/pielove', (req, res) => res.send('I love pie!'));

router.get('/anotherpierequest', (req, res) => res.send('Here is more pie'));

router.get("/getallpies", validateSession, (req, res) => {
    Pie.findAll()
        .then(pie => res.status(200).json(pie))
        .catch(err => res.status(500).json({
            error: err
        }))
})

router.post('/createpie', validateSession, async (req, res) => {
    try {
        // const pieRequest = {
        //     //model : postman/view
        //     flavor: req.body.flavor,
        //     size: req.body.size,
        //     hotpie: req.body.hotpie,
        //     vegan: req.body.vegan,
        //     baseOfPie: req.body.baseOfPie,
        //     crust: req.body.crust
        // }

        //  OR
        const {flavor, size, hotPie, vegan, baseOfPie, crust} = req.body;

        let newPie = await Pie.create({
            flavor, size, hotPie, vegan, baseOfPie, crust
        });
        res.status(200).json({
            pie: newPie,
            message: "Pie Created!"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Pie Creation Failed."
        })
    }
})

router.get('/:flavor', (req, res) => {
    // models finds one flavor in db compared to flavor in route
  Pie.findOne({ where: { flavor: req.params.flavor }})
    .then(pie => res.status(200).json(pie))
    .catch(err => res.status(500).json({ error: err}))
})

// router.put('/:id', (req, res) => {
//   Pie.update(req.body, { where: { id: req.params.id }})
//     .then(pie => res.status(200).json(pie))
//     .catch(err => res.status(500).json(err))
// })

//* PUT then GET
router.put("/:id", (req, res) => {
    // creating a variable (query) and I am assigning the value of the id that gets passed into the route parameter
    const query = req.params.id;
    // updating the pie which whateer data I send through WHERE the id of the pie matches the value of query
    Pie.update(req.body, { where: { id: query } })
        // on success, this gives me the number of pies successfully updated (piesUpdated: integer)
      .then((piesUpdated) => {
          // on success, go back into my Pie model and locate the single pie based on the id that matches the value of query
        Pie.findOne({ where: { id: query } })
            // on success of retrieved pie, I store the retrieved pie as a parameter called locatedUpdatedPie
        .then((locatedUpdatedPie) => {
            // I created status code of 200 (SUCCESS) and add an object with desired data (locatedpie, success message, # of pies updated)
          res.status(200).json({
            pie: locatedUpdatedPie,
            message: "Pie updated successful",
            piesChanged: piesUpdated,
          });
        });
      })
      // basic error message
      .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
    Pie.destroy({
        where: {id: req.params.id}
    })
    .then(pie => res.status(200).json(pie))
    .catch(err => res.json({error: err}))   // OR json(err)
})

module.exports = router;

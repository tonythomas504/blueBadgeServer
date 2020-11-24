const express = require('express');
const router = express.Router();
const {Rating} = require('../models');
const validateSession = require('../middleware/validateSession');

// router.get('/pielove', (req, res) => res.send('I love pie!'));

// router.get('/anotherpierequest', (req, res) => res.send('Here is more pie'));

router.get("/myratings", validateSession, (req, res) => {
    Rating.findAll()
        .then(rating => res.status(200).json(rating))
        .catch(err => res.status(500).json({
            error: err
        }))
})

router.post('/createrating', validateSession, async (req, res) => {
    try {
        const {rating, movieId, userId, genresId} = req.body;

        let newRating = await Rating.create({
            rating, movieId, userId, genresId
        });
        res.status(200).json({
            rating: newRating,
            message: "Rating successful!"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Rating Failed."
        })
    }
})

//* PUT then GET
router.put("/:id", (req, res) => {
    const query = req.params.id;
    Pie.update(req.body, { where: { id: query } })
      .then((piesUpdated) => {
        Pie.findOne({ where: { id: query } })
        .then((locatedUpdatedPie) => {
          res.status(200).json({
            pie: locatedUpdatedPie,
            message: "Pie updated successful",
            piesChanged: piesUpdated,
          });
        });
      })
      .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
    Pie.destroy({
        where: {id: req.params.id}
    })
    .then(pie => res.status(200).json(pie))
    .catch(err => res.json({error: err}))
})

module.exports = router;

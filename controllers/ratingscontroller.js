const express = require('express');
const router = express.Router();
const {Rating} = require('../models');
const validateSession = require('../middleware/validateSession');

router.get("/myratings", validateSession, (req, res) => {
    Rating.findAll()
        .then(rating => res.status(200).json(rating))
        .catch(err => res.status(500).json({
            error: err
        }))
})

router.post('/createrating', validateSession, async (req, res) => {
    try {
        const {rating, movieId, userId} = req.body;

        let newRating = await Rating.create({
            rating, movieId, userId
        });
        res.status(200).json({
            rating: newRating,
            message: "Rating successful!"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        })
    }
})



router.put("/:rating", (req, res) => {
    // creating a variable (query) and I am assigning the value of the id that gets passed into the route parameter
    const query = req.params.rating;
    // updating the pie which whateer data I send through WHERE the id of the pie matches the value of query
    rating.update(req.body, { where: { rating: query } })
        // on success, this gives me the number of pies successfully updated (piesUpdated: integer)
      .then((ratingUpdated) => {
          // on success, go back into my Pie model and locate the single pie based on the id that matches the value of query
        rating.findOne({ where: { rating: query } })
            // on success of retrieved pie, I store the retrieved pie as a parameter called locatedUpdatedPie
        .then((locatedUpdatedrating) => {
            // I created status code of 200 (SUCCESS) and add an object with desired data (locatedpie, success message, # of pies updated)

router.put("/:id", (req, res) => {
    
    const query = req.params.id;
    
    Rating.update(req.body, { where: { id: query } })
      .then((ratingUpdated) => {
        Rating.findOne({ where: { id: query } })
        .then((locatedUpdatedRating) => {

          res.status(200).json({
            rating: locatedUpdatedRating,
            message: "Rating updated successful",
            ratingChanged: ratingUpdated,
          });
        });
      })

      // basic error message

      .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
    Rating.destroy({
        where: {id: req.params.id}
    })
    .then(rating => res.status(200).json(rating))
    .catch(err => res.json({error: err}))   // OR json(err)
})

module.exports = router;
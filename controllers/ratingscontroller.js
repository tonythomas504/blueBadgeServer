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
        const {rating, movieId, userId, genresId} = req.body;

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
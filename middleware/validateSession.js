const jwt = require('jsonwebtoken');
const {User} = require('../models');
const validateSession = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  } else if (req.headers.authorization) {
    const {authorization} = req.headers;
    const payload = authorization ? jwt.verify(authorization, process.env.JWT_SECRET) : undefined;
    console.log(payload);
    if(payload){
      User.findOne({
        where: {id: payload.id} // finds a user whose id matches the id was assigned upon login
      })
      .then(user => {
        console.log("REQUEST BEFORE", req.user)
        req.user = user;
        // this creates a user object inside of my request object. This object stores the data we grabbed from the user table in the database
        console.log("REQUEST AFTER", req.user)
        next() //next jumps out of the callback function. We use this to stop triggering the callback function a second time.
      })
    } else {
      res.status(401).json({
        message: "Not authorized."
      })
    }
  } else {
    res.status(401).json({
      message: "Not allowed."
    })
  }
}
module.exports = validateSession;
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../secretsConfig');

module.exports = (req, res, next) => {
  const token = req.headers.authorization

  if(token){
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if(err){
        next({status: 401, message: "token invalid"})
      } else {
        next()
      }
    })
  } else {
    next({status: 401, message: 'token required'})
  }
};

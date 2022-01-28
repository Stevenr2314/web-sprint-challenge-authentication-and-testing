const router = require('express').Router();
const secrets = require('../secretsConfig')
const { checkRegisterPayload, checkLogin, } = require('../middleware/auth-middleware')
const Users = require('./auth-model')

router.post('/register', checkRegisterPayload, (req, res, next) => {
  Users.create(req.body)
    .then(user => res.status(200).json(user))
    .catch(err => next(err))
});

router.post('/login', checkLogin, (req, res) => {
  res.status(200).json({message: `welcome, ${req.body.username}`, token: req.token})
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
});

module.exports = router;

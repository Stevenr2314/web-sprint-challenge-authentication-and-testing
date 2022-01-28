const router = require('express').Router();
const { checkRegisterPayload, checkLogin, } = require('../middleware/auth-middleware')
const Users = require('./auth-model')

router.post('/register', checkRegisterPayload, (req, res, next) => {
  Users.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(err => next(err))
});

router.post('/login', checkLogin, (req, res) => {
  res.status(200).json({message: `welcome, ${req.body.username}`, token: req.token})
});

module.exports = router;

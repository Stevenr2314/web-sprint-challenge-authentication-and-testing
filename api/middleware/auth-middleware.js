const Users = require('../auth/auth-model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const checkRegisterPayload = (req, res, next) => {
    const {username, password} = req.body
    if(!username || !password){
        next({status: 401, message:"username and password required"})
    } else {
        Users.getByUsername(username)
            .then(user => {
                if(user){
                    next({status: 400, message: 'username taken'})
                } else {
                    password = bcrypt.hashSync(password, 8)
                    next()
                }
            })
    }
}

const checkLogin = (req, res, next) => {
    const {username, password} = req.body
    if(!username || !password){
        next({status: 401, message:"username and password required"})
    } else {
        Users.getByUsername(username)
            .then(user => {
                if(user && bcrypt.compareSync(password, user.password)){
                    req.token = generateToken(user)
                    next()
                } else {
                    next({status: 400, message: 'invalid credentials'})
                }
            })
    }
}

function generateToken(user) {
    const payload = {
      subject: user.id,
      username: user.username
    };
    const options = {
      expiresIn: '1h',
    };
  
    return jwt.sign(payload, secrets.jwtSecret, options); // this method is synchronous
  }
module.exports = {
    checkRegisterPayload,
    checkLogin
}
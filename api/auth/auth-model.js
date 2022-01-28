const db = require('../../data/dbConfig')


const getById = id => {
    return db('users').where('id', id).first()
}

const getByUsername = username => {
    return db('users').where('username', username).first()
}

const create = user => {
return db('users').insert(user)
    .then(id => 
        getById(id)
          .then(project => project))
}

module.exports = {
    getById,
    create,
    getByUsername
}
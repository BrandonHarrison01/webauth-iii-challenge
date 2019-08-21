const db = require('../database/db-config')

module.exports = {
    add,
    find,
    findBy,
    findById,
};

function add(user) {
    return db('users')
        .insert(user)
        .then(ids => {
            return findById(ids);
        })
}

function find(id) {
    return db('users')
}

function findBy(filter) {
    return db('users').where(filter)
}

function findById(id) {
    return db('users').where({ id }).first()
}

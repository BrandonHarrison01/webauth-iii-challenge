const db = require('../database/db-config')

module.exports = {
    add,
    find,
    findBy,
    findById,
};

async function add(user) {
    const [id] = await db('users').insert(user);
  
    return findById(id);
}

function find() {
    return db('users')
}

function findBy(userCreds) {
    console.log('userCreds', userCreds)
    return db('users').where('username', '=', userCreds)
}

function findById(id) {
    return db('users').where({ id }).first()
}

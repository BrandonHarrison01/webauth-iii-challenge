const express = require('express')

const server = express()

const usersRouter = require('./users/users-route')

server.use(express.json())

server.use('/api', usersRouter)

server.get('/', (req, res) => {
    res.send('sanity check')
})

module.exports = server;

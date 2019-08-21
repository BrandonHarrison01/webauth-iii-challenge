const router = require('express').Router()
const jwt = require('jsonwebtoken')

const Users = require('./users-model')

router.post('/register', (req, res) => {
    let user = req.body;
})

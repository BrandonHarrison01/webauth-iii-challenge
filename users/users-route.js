const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Users = require('./users-model')

router.post('/register', (req, res) => {
    let newUser = req.body;

    Users.add(newUser)
        .then(user => {
            const token = getToken(user)
            res.status(200).json({
                message: `Welcome ${user.username}`,
                token,
            })
        })
        .catch(error => res.status(500).json(error))
})

router.post('/login', (req, res) => {
    let { username, password } = req.body

    Users.findBy({ username })
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = getToken(user);

                res.status(200).json({
                    message: `Welcome ${user.username}`,
                    token,
                })
            } else {
                res.status(401).json({ message: 'Invalid Credentials' })
            }
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

router.get('/users', (req, res) => {
    Users.find()
        .then(results => res.json(results))
})

function getToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    }
    const secret = 'this is a secret'
    return jwt.sign(payload, secret);
}

module.exports = router;
const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Users = require('./users-model')

router.post('/register', (req, res) => {
    let newUser = req.body;
    const hash = bcrypt.hashSync(newUser.password, 10);
    newUser.password = hash

    Users.add(newUser)
        .then(saved => {
            res.status(201).json(saved)
        })
        .catch(error => res.status(500).json(error))
})

router.post('/login', (req, res) => {
    let {username, password} = req.body
    console.log('login', req.body)

    Users.findBy(username)
        .first()
        .then(user => {
            console.log(user)
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
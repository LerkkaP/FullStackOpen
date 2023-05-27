const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    
    const { username, name, password } = request.body
    
    if (password === undefined || password.length < 3) {
        return response.status(400).json({error: 'password is missing or it is too short'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
      })

    try {
        await user.save()
        response.status(201).json(user)
    } catch {
        response.status(400).json({error: 'invalid user'})
    }
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})

    response.json(users)
})

module.exports = usersRouter
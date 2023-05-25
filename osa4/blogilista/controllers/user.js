const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    
    const { username, name, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
      })

    await user.save()
    response.status(201).json(user)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})

    response.json(users)
})

module.exports = usersRouter
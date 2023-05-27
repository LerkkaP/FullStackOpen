const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')


beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

describe('initially one user at db', () => {
  test('invalid user is not added', async () => {

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }
  
    const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/users')
    const usersAtEnd = await helper.usersInDb()
  
    expect(result.body.error).toContain('invalid user' || 'password is missing or it is too short')
    expect(response.body).toHaveLength(usersAtEnd.length)
  
  })
})


afterAll(async () => {
    await mongoose.connection.close()
  })
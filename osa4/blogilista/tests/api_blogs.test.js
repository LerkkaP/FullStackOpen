const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('correct number of blogs', async () => {
    const response = await api.get('/api/blogs')
    
    expect(response.body).toHaveLength(4)
})

test('blogs containt id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.map(blog => blog.id)).toBeDefined()
})

afterAll(async () => {
  await mongoose.connection.close()
})
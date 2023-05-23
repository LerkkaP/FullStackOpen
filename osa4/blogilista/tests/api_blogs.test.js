const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { createTestScheduler } = require('jest')
const api = supertest(app)

const initialBlogs = [
    {
        "title": "New Blog",
        "author": "Blogikirjoittaja",
        "url": "https://www.example.com",
        "likes": 10
    },
    {
        "title": "Fullstack programming",
        "author": "Erik Peteri",
        "url": "https://www.example.com",
        "likes": 15
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('correct number of blogs', async () => {
    const response = await api.get('/api/blogs')
    
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('blogs contain id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.map(blog => blog.id)).toBeDefined()
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: "Fullstack programming",
        author: "Erik Peteri",
        url: "https://www.example.com",
        likes: 15
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length + 1)
})

test('blog without likes is added', async () => {
    const newBlog = {
        title: "Fullstack programming",
        author: "Erik Peteri",
        url: "https://www.example.com"
    }

    if (newBlog.hasOwnProperty("likes") === false) {
        newBlog["likes"] = 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length + 1)
})

afterAll(async () => {
  await mongoose.connection.close()
})
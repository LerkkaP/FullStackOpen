const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

const initialBlogs = [
    {
        "title": "New Blog",
        "author": "Blogikirjoittaja",
        "url": "https://www.example.com"
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

test('blog without likes is set to zero likes', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body

    blogs.forEach(blog => {
        if (!blog.hasOwnProperty("likes")) {
            expect(blog.likes).toBe(0)
        }
    })
})

afterAll(async () => {
  await mongoose.connection.close()
})
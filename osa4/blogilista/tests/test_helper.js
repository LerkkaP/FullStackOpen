const Blog = require('../models/blog')

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

module.exports = {
    initialBlogs
}
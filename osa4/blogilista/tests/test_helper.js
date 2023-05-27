const User = require('../models/user')

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

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }

module.exports = {
    initialBlogs, usersInDb
}
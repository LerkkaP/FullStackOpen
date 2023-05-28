const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, id: 1})
  response.json(blogs)

})

/*const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}*/

blogsRouter.post('/', async (request, response) => {

  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(400).json({error: 'token invalid'})
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  try {
    await blog.save()
    user.blogs = user.blogs.concat(blog._id)
    await user.save()
    response.status(201).json(blog)
  } catch(error) {
    response.status(400).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  
  await Blog.findByIdAndRemove(request.params.id)

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {

  const body = request.body

  const blog = {
    "title": body.title,
    "author": body.author,
    "url": body.url,
    "likes": body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})

  response.status(200).json(updatedBlog)

})

module.exports = blogsRouter
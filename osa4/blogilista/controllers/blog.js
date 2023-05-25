const blogsRouter = require('express').Router()
const { update } = require('lodash')
const blog = require('../models/blog')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)

})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  try {
    await blog.save()
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
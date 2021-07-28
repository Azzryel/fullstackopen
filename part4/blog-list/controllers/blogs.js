const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get('/', async (request, response) => {
  
  const blogs = await Blog.find({})  
  
  response.json(blogs)

  })
  
blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    
    if (!blog.likes) {
      blog.likes = 0
    }
    else if(!blog.title || !blog.url) {
      response.status(400).end()
    }

    const result = await blog.save()

    response.status(201).json(result)

  })

blogsRouter.delete("/:id", async (request, response) => {
  const result = await Blog.findByIdAndRemove(request.params.id)
  
  response.status(204).end()
})

module.exports = blogsRouter
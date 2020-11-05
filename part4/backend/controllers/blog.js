const blogRouter = require('express').Router()
const Blog = require('../moudels/blog')

blogRouter.get('/', (request, response, next) => {
  Blog.find({})
    .then((blogs) => {
      response.json(blogs)
    })
    .catch((err) => next(err))
})

blogRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then((result) => {
      response.json(result)
    })
    .catch((err) => next(err))
})

module.exports = blogRouter
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const { request, response } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })
    response.json(blogs)  
})

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
    const body = request.body
    const user = request.user

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })

    try {
        savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedBlog)
    } catch (error) {
        next(error)
    }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
    
    const user = request.user
    const userId = user._id.toString()
    
    var blogToDelete = await Blog.findById(request.params.id)

    if (blogToDelete) {
        var blogUserId = blogToDelete.user.toString()

        if (userId === blogUserId) {
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()
        } else {
            response.status(401).json({ error: 'This blog can not be deleted by ' + user.name })
        }
    } else {
        response.status(404).end()
    }

})

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        likes: body.likes
    }

    Blog.exists({_id:request.params.id}, async (err, doc) => {
        if (err) {
            response.status(404).end()
        } else {
            const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
            console.log(updatedBlog)
            response.status(200).json(updatedBlog)
        }
    })
    
})

module.exports = blogsRouter
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
    
    let listOfUsers = []
    
    await User.deleteMany({})

    for (let user of helper.initialUsers) {
        let newUser = new User(user)
        let savedUser = await newUser.save()
        listOfUsers = listOfUsers.concat(savedUser._id.toString())
        console.log(listOfUsers)
    }
    
    await Blog.deleteMany({})
    
    for (let blog of helper.initialBlogs) {
        let user_id = listOfUsers[Math.floor(Math.random()*listOfUsers.length)]
        let newBlog = new Blog(blog)
        newBlog.user = user_id
        let user = await User.findById(user_id)
        let savedBlog = await newBlog.save()
        user.blogs = user.blogs.concat(savedBlog._id.toString())
        await user.save()
    }
  
})

describe('Testing the GET call', () => {
    test('api returns the correct number of blogs', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('the unique identifier is named "id"', async () => {
        const response = await api.get('/api/blogs')
        const firstBlog = response.body[0]
        expect(firstBlog.id).toBeDefined()
    })
})

describe('Adding blogs', () => {
    test('posting a blog creates a new blog in the db', async () => {
        const newBlog = {
            title: "Another Test Post",
            author: "Magnus Indregard",
            url: "http://blog.cleancoder.com/test-post",
            likes: 4
        }

        const savedBlog = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)

        console.log(savedBlog)
        
        expect(savedBlog.body.title).toEqual(newBlog.title)
        expect(savedBlog.body.author).toEqual(newBlog.author)
        expect(savedBlog.body.url).toEqual(newBlog.url)

        const allBlogs = await api.get('/api/blogs')
        expect (allBlogs.body).toHaveLength(helper.initialBlogs.length + 1)

    })

    test('likes defaults to zero if undefined', async () => {
        const newBlogNoLikes = {
            title: "Another Test Post",
            author: "Magnus Indregard",
            url: "http://blog.cleancoder.com/test-post"
        }

        const savedBlog = await api
        .post('/api/blogs')
        .send(newBlogNoLikes)
        .expect(201)

        expect(savedBlog.body.likes).toBeDefined
        expect(savedBlog.body.likes).toEqual(0)
    })

    test('api returns 400 if title is missing', async () => {
        const newBlogNoTitle = {
            author: "Magnus Indregard",
            url: "http://blog.cleancoder.com/test-post"
        }

        await api
            .post('/api/blogs')
            .send(newBlogNoTitle)
            .expect(400)

    })

    test('api returns 400 if url is missing', async () => {
        const newBlogNoUrl = {
            title: "Another Test Post",
            author: "Magnus Indregard"
        }

        await api
            .post('/api/blogs')
            .send(newBlogNoUrl)
            .expect(400)

    })
})

describe('deleting blogs', () => {
    test('deleting a blog gives a 204', async () => {
        const blogs = await helper.blogsInDb()
        const blogToDelete = blogs[0].id
        await api
            .delete('/api/blogs/' + blogToDelete)
            .expect(204)
    })

    test('list of blog is one shorter after deleting', async () => {
        const blogs = await helper.blogsInDb()
        const blogToDelete = blogs[0]
        await api.delete('/api/blogs/' + blogToDelete.id)

        const blogsAfterDelete = await helper.blogsInDb()
        expect (blogsAfterDelete).toHaveLength(blogs.length - 1)
    })


    test('the deleted blog is no longer in the db', async () => {
        const blogs = await helper.blogsInDb()
        const blogToDelete = blogs[0]
        await api.delete('/api/blogs/' + blogToDelete.id)

        const blogsAfterDelete = await helper.blogsInDb()

        const ids = blogsAfterDelete.map(r => r.id)
        expect(ids).not.toContain(blogToDelete.id)
        
    })

    test('trying to delete a non-existing blog returns a 404 and nothing is deleted', async () => {
        const blogs = await helper.blogsInDb()
        const blogToDelete = {
            title: "Another Test Post",
            author: "Magnus Indregard",
            url: "http://blog.cleancoder.com/test-post",
            likes: 4,
            id: "12342342314"
        }

        await api
            .delete('/api/blogs/' + blogToDelete.id)
            .expect(404)

        const blogsAfterDelete = await helper.blogsInDb()

        expect(blogsAfterDelete).toEqual(blogs)
    })

})

describe('updating blogs', () => {

    test('fields have the correct value after update', async () => {
        const blogs = await helper.blogsInDb()
        const blogToUpdate = blogs[0]

        const updatedFields = {
            title: "Update Post",
            author: "Updated Author",
            likes: 999
        }

        const updatedBlog = await api.put('/api/blogs/' + blogToUpdate.id)
            .send(updatedFields)
            .expect(200)

        console.log(updatedBlog.body)
        
        expect(updatedBlog.body.likes).toEqual(updatedFields.likes)
        expect(updatedBlog.body.title).toEqual(updatedFields.title)
        expect(updatedBlog.body.author).toEqual(updatedFields.author)

    })

    test('number of blogs in db stays the same after update', async () => {
        const blogs = await helper.blogsInDb()
        const blogToUpdate = blogs[0]
        
        const updatedFields = {
            title: "Update Post",
            author: "Updated Author",
            likes: 999
        }

        await api.put('/api/blogs/' + blogToUpdate.id)
            .send(updatedFields)
            .expect(200)

        const blogsAfterUpdate = await helper.blogsInDb()
        expect (blogsAfterUpdate).toHaveLength(blogs.length)
    })

    test('fields that are not part of the body are not changed', async () => {
        const blogs = await helper.blogsInDb()
        const blogToUpdate = blogs[0]
        
        const updatedFields = {
            title: "Update Post",
            likes: 999
        }

        const updatedBlog =  await api.put('/api/blogs/' + blogToUpdate.id)
            .send(updatedFields)
            .expect(200)

        expect (updatedBlog.body.author).toEqual(blogToUpdate.author)

    })

    test('trying to update a non-existing blog returns a 404', async () => {
        const blogToUpdate = {
            title: "Another Test Post",
            author: "Magnus Indregard",
            url: "http://blog.cleancoder.com/test-post",
            likes: 4,
            id: "12342342314"
        }

        await api
            .put('/api/blogs/' + blogToUpdate.id)
            .expect(404)

    })

})
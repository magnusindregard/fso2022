const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "First blog",
        author: "me",
        url: "/blogs/first-one",
        likes: 5,
        user: "644921e7c12e9e3cf13be9c2"
    },
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        user: "644921e7c12e9e3cf13be9c2"
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        user: "644921e7c12e9e3cf13be9c2"
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12, 
      user: "644922f8999db6b9ac0cc5fd"
    },
    {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      user: "644922f8999db6b9ac0cc5fd"
    },
    {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      user: "644922f8999db6b9ac0cc5fd"
    },
    {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      user: "644925d859a303b486d43cb8"
    } 
]

const initialUsers = [
  {
      "username": "magnus",
      "name": "Magnus Indregard",
      "blogs": [],
      "passwordHash": ""
  },
  {
      "blogs": [],
      "username": "sigrid",
      "name": "Sigrid Indregard",
      "passwordHash": ""
  },
  {
      "blogs": [],
      "username": "annemarthe",
      "name": "Anne-Marthe Indregard",
      "passwordHash": ""
  }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = { initialUsers, initialBlogs, blogsInDb }
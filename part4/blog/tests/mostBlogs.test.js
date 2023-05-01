const mostBlogs = require('../utils/mostBlogs_helper').mostBlogs

describe('Author with most likes', () => {
    const listWithMultipleBlogs = [
        {
            _id: "63c44ed29169322b4c268631",
            title: "First blog",
            author: "me",
            url: "/blogs/first-one",
            likes: 5,
            __v: 0
        },
        {
            _id: "63c45db757180dcc4e95eda1",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        },
        {
            _id: "63c45dc657180dcc4e95eda3",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        },
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12,
          __v: 0
        },
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          likes: 10,
          __v: 0
        },
        {
          _id: "5a422ba71b54a676234d17fb",
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
          likes: 0,
          __v: 0
        },
        {
          _id: "5a422bc61b54a676234d17fc",
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 2,
          __v: 0
        } 
    ]

    test('When all test blogs are present, we find that Robert C. Martin is the guy', () => {
        const result = mostBlogs(listWithMultipleBlogs)
        expect(result).toEqual(
            {
                author: 'Robert C. Martin',
                numberOfBlogs: 3
            }
        )
    })
})
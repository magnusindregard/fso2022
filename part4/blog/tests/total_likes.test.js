const totalLikes = require('../utils/totalLikes_helper').totalLikes

describe('total likes from one post', () => {
    const listWithOneBlog = [
        {
            "_id": "63c44ed29169322b4c268631",
            "title": "First blog",
            "author": "me",
            "url": "/blogs/first-one",
            "likes": 5,
            "__v": 0
        }
    ]

    test('when list has only one blog, equals the likes of that', () => {
        const result = totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })
})

describe('total likes from multiple posts', () => {
    const listWithMultipleBlogs = [
        {
            "_id": "63c44ed29169322b4c268631",
            "title": "First blog",
            "author": "me",
            "url": "/blogs/first-one",
            "likes": 5,
            "__v": 0
        },
        {
            "_id": "63c45db757180dcc4e95eda1",
            "title": "React patterns",
            "author": "Michael Chan",
            "url": "https://reactpatterns.com/",
            "likes": 7,
            "__v": 0
        },
        {
            "_id": "63c45dc657180dcc4e95eda3",
            "title": "Go To Statement Considered Harmful",
            "author": "Edsger W. Dijkstra",
            "url": "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            "likes": 5,
            "__v": 0
        }
    ]

    test('when list has multiple blogs, equals the likes of that', () => {
        const result = totalLikes(listWithMultipleBlogs)
        expect(result).toBe(17)
    })
})

describe('total likes when list is empty', () => {
    const emptyBlogList = [
        
    ]

    test('when list has multiple blogs, equals the likes of that', () => {
        const result = totalLikes(emptyBlogList)
        expect(result).toBe(0)
    })
})
const favoriteBlog = require('../utils/favoriteBlog_helper').favoriteBlog

describe('Favorite blog from multiple posts', () => {
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

    test('when list has multiple blogs, the one with the higher rating is returned', () => {
        const result = favoriteBlog(listWithMultipleBlogs)
        expect(result).toEqual(
            {
                "title": "React patterns",
                "author": "Michael Chan",
                "likes": 7
            }
        )
    })
})

describe('Favorite blog when one post', () => {
    const listWithMultipleBlogs = [
        {
            "_id": "63c44ed29169322b4c268631",
            "title": "First blog",
            "author": "me",
            "url": "/blogs/first-one",
            "likes": 5,
            "__v": 0
        }
    ]

    test('when list has one blog, that blog is returned', () => {
        const result = favoriteBlog(listWithMultipleBlogs)
        expect(result).toEqual(
            {
                "title": "First blog",
                "author": "me",
                "likes": 5
            }
        )
    })
})
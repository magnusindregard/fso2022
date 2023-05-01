const _ = require('lodash');
const blogsByAuthor = require('../utils/blogsByAuthor_helper').blogsByAuthor

const mostBlogs = (blogs) => {
    const numberOfBlogsByAuthor = _.map(blogsByAuthor(blogs), (author) => {
        
        const numberOfBlogs = _.size(author.blogs)

        return {
            "author": author.name,
            "numberOfBlogs": numberOfBlogs
        }        
    })

    const authorsSortedByProductivity = _.orderBy(numberOfBlogsByAuthor, 'numberOfBlogs', 'desc')

    return authorsSortedByProductivity[0]
}

module.exports = {
    mostBlogs
}
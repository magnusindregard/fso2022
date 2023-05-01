const _ = require('lodash');
const blogsByAuthor = require('../utils/blogsByAuthor_helper').blogsByAuthor

const mostLikes = (blogs) => {
    const numberOfLikesByAuthor = _.map(blogsByAuthor(blogs), (author) => {
        
        const numberOfLikes = _.reduce(author.blogs, (sum, n) => {
            return sum + n.likes;
        }, 0)

        return {
            "author": author.name,
            "likes": numberOfLikes
        }
         
    })

    const authorsSortedByPopularity = _.orderBy(numberOfLikesByAuthor, 'likes', 'desc')

    return authorsSortedByPopularity[0]
}

module.exports = {
    mostLikes
}
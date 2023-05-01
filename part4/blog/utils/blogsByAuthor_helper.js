const _ = require('lodash');

const blogsByAuthor = (blogs) => {
    const groupedBlogs = _.chain(blogs)
        .groupBy('author')
        .map(
            (value, key) => (
                {
                    name: key,
                    blogs: value
                }
            )   
        )
        .value()
        return groupedBlogs
    }
    



module.exports = {
    blogsByAuthor
}
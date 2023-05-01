const favoriteBlog = (blogs) => {
    const favorite = blogs.reduce(
        (accumulator, currentValue) => {
            if (accumulator.likes > currentValue.likes) { 
                accumulator 
                return accumulator
             } else {
                currentValue
                return currentValue
             }
        }
        
    )
    const favoriteOutput = 
    {
        "title": favorite.title,
        "author": favorite.author,
        "likes": favorite.likes
    }
    return favoriteOutput
}

module.exports = {
    favoriteBlog
}
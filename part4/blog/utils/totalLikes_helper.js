const totalLikes = (blogs) => {
    const sum = blogs.reduce(
        (accumulator, currentValue) => accumulator + currentValue.likes,
        0
    )
    return sum
}

module.exports = {
    totalLikes
}
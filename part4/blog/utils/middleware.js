const jwt = require('jsonwebtoken')
const User = require('../models/user')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.code === 11000) {
    return response.status(400).json({ error: 'User name is already taken' })
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(400).json({ error: error.message })
  } 

  next(error)
}

const tokenExtractor = (request, response, next) => {  
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      request.token = authorization.replace('Bearer ', '')
    }
    next()
}

const userExtractor = (request, response, next) => {
  jwt.verify(request.token, process.env.SECRET, async (err, result) => {
    if (err) {
        next(err)
    } else {
        request.user = await User.findById(result.id)
        next()
    }
  })
}


module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}

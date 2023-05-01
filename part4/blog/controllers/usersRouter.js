const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
// const { request } = require('express')
// const { response } = require('../app')

usersRouter.post('/', async (request, response, next) => {
    const { username, name, password } = request.body
    
    if(password && password.length > 2) {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            username,
            name,
            passwordHash,
        })

        try {
            const savedUser = await user.save()
            response.status(201).json(savedUser)
        } catch (error) {
            next(error)
        }

    } else {
        response.status(401).json({"error": "Password is not valid"})
    }

})

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('blogs', { 
            title: 1,
            url: 1,
            likes: 1
        })
    response.json(users)
})

module.exports = usersRouter
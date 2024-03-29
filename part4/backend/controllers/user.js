const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../moudels/user')

userRouter.get('/', async (request, response, next) => {
  const users = await User.find({}).populate('notes', { content: 1, date: 1 })
  response.json(users)
})

userRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  const exisitingUser = await User.findOne({ username })
  if (exisitingUser) {
    return response.status(400).json({
      error: 'username must be unique',
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(200).json(savedUser)
})

module.exports = userRouter

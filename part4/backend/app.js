const config = require('./utils/config')
const express = require('express')
const app = express()

const cors = require('cors')
const mongoose = require('mongoose')

const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const userRouter = require('./controllers/user')
const blogRouter = require('./controllers/blog')
const noteRouter = require('./controllers/note')

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((r) => {
    logger.info('connected to MongoDB')
  })
  .catch((err) => {
    logger.info('error connecting to MongoDB:', err.message)
  })

app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)

app.use('/api/user', userRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/notes', noteRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

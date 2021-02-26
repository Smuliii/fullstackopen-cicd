const config = require('./utils/config')
const path = require('path')
const express = require('express')
require('express-async-errors')
const cors = require('cors')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const testingRouter = require('./controllers/testing')
const mongoose = require('mongoose')

const app = express()

mongoose.set('useCreateIndex', true)

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })
mongoose.set('useFindAndModify', false)

// Static files for React app
app.use(express.static(path.join(__dirname, '../frontend/build')))

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter)
}

// Every non-api request goes to React app
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../frontend/build/index.html')))

app.use(middleware.errorHandler)

module.exports = app
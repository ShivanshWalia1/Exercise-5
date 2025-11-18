// tests/appForTests.js
import express from 'express'
import userRouter from '../routes/user.js' // adjust only if your router lives elsewhere

const createApp = () => {
  const app = express()
  app.use(express.json())
  app.use('/user', userRouter)
  return app
}

export default createApp

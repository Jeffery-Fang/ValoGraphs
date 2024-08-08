import express, { Application } from 'express'
import { default as userRouter } from './controllers/usersRouter.js'

const app: Application = express()

app.use('/users', userRouter)

export default app

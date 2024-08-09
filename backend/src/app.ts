import express, { Application } from 'express'
import { default as playerRouter } from './controllers/playersRouter.js'

const app: Application = express()

app.use('/players', playerRouter)

export default app

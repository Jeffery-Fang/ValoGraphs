import express, { Application } from 'express'
import { default as playersRouter } from './controllers/playersRouter.js'
import { default as matchesRouter } from './controllers/matchesRouter.js'

const app: Application = express()

app.use('/players', playersRouter)
app.use('/matches', matchesRouter)

export default app

import express, { Application } from 'express'
import { default as playersRouter } from './routers/playersRouter.js'
import { default as matchesRouter } from './routers/matchesRouter.js'
import { default as profilesRouter } from './routers/profilesRouter.js'

const app: Application = express()

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})

app.use('/players', playersRouter)
app.use('/matches', matchesRouter)
app.use('/profiles', profilesRouter)
app.use('/', function (req, res, next) {
    res.status(200).json('No resources on / try /players, /profiles or /matches')
})

export default app

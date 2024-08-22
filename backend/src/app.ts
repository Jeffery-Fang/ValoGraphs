import express, { Application } from 'express'
import { default as playersRouter } from './routers/players_router.js'
import { default as matchesRouter } from './routers/matches_router.js'

const app: Application = express()

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})

app.use('/players', playersRouter)
app.use('/matches', matchesRouter)
app.use('/', function (req, res, next) {
    res.status(200).json('No resources on / try /players and /matches')
})

export default app

import express, { Application } from 'express'
import { default as playersRouter } from './routers/players_router.js'
import { default as matchesRouter } from './routers/matches_router.js'

const app: Application = express()

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    // res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
    // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
})

app.use('/players', playersRouter)
app.use('/matches', matchesRouter)
app.use('/', function (req, res, next) {
    res.status(200).send('No resources on / try /players and /matches')
})

export default app

import 'dotenv/config'
import express, { Application } from 'express'
import { AppDataSource } from '../src/data-source.js'

const app: Application = express()
const PORT: number = Number(process.env.PORT) || 3000

app.get('/', (req, res) => res.send('Express on Vercel'))

AppDataSource.initialize()
    .then((): void => {
        console.log('Database connection initialized')

        app.listen(PORT, (): void => {
            console.log(`server started on port ${PORT}`)
        })
    })
    .catch((err): void => {
        console.log('Error connecting to the database', err)
    })

module.exports = app

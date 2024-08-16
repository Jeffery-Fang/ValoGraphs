import 'dotenv/config'
import app from '../src/app.js'
import { AppDataSource } from '../src/data-source.js'

const PORT: number = Number(process.env.PORT) || 3000

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

// process.on('SIGINT', (): void => {
//     AppDataSource.destroy()
//         .then((): void => {
//             console.log('Database connection closed')
//             process.exit(0)
//         })
//         .catch((err): void => {
//             console.log('Error closing connection to database', err)
//             process.exit(1)
//         })
// })

module.exports = app

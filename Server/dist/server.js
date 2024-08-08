import 'dotenv/config';
import app from './app.js';
import { AppDataSource } from './data-source.js';
const PORT = Number(process.env.PORT) || 3000;
AppDataSource.initialize()
    .then(() => {
    console.log('Database connection initialized');
    app.listen(PORT, () => {
        console.log(`server started on port ${PORT}`);
    });
})
    .catch((err) => {
    console.log('Error connecting to the database', err);
});
process.on('SIGINT', () => {
    AppDataSource.destroy()
        .then(() => {
        console.log('Database connection closed');
        process.exit(0);
    })
        .catch((err) => {
        console.log('Error closing connection to database', err);
        process.exit(1);
    });
});

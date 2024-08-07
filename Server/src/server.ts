import app from './app.js';
import './data-source.js'
import 'dotenv/config';
import { AppDataSource } from './data-source.js';

const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT, (): void => {
    console.log(`server started on port ${PORT}`);
});

process.on('SIGINT', (): void => {
    AppDataSource.destroy().then(
        (): void => {
            console.log('Database connection closed');
            process.exit(0);
    }).catch(
        (err): void => {
            console.log("Error closing connection to database", err);
            process.exit(1);
        }
    );
});
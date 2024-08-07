import app from './app.js';
import 'dotenv/config';
const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});
process.on('SIGINT', () => {
    process.exit(0);
});

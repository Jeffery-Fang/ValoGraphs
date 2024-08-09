import express from 'express';
import { default as playerRouter } from './controllers/playersRouter.js';
const app = express();
app.use('/players', playerRouter);
export default app;

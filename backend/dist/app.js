import express from 'express';
import { default as playersRouter } from './routers/playersRouter.js';
import { default as matchesRouter } from './routers/matchesRouter.js';
const app = express();
app.use('/players', playersRouter);
app.use('/matches', matchesRouter);
export default app;

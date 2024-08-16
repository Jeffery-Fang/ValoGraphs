import express from 'express';
import { default as playersRouter } from './routers/playersRouter.js';
import { default as matchesRouter } from './routers/matchesRouter.js';
const app = express();
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
    // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next();
});
app.use('/players', playersRouter);
app.use('/matches', matchesRouter);
export default app;

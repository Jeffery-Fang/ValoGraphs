import express from 'express';
import { default as userRouter } from './controllers/usersRouter.js';
const app = express();
app.use('/users', userRouter);
export default app;

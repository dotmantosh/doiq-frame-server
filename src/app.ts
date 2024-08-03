import express, { Express } from "express";
import morgan from 'morgan';
import cors from 'cors';

import * as middlewares from './middlewares';
import api from './routes'

import dotenv from "dotenv";
import connectDB from "./db/db";

dotenv.config();
connectDB()

const app: Express = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api/v1', api)

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app
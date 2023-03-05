import express, {NextFunction, Request, Response} from 'express';
import path from 'path';
import dotenv from "dotenv";
import cors from 'cors';
import helmet from 'helmet';

const app = express();
const envPath = path.resolve(__dirname, `./env/${process.env.NODE_ENV}.env`);
dotenv.config({path: envPath});

import appRoute from "./app/app.routing";
import {db} from './database';

app.use(express.json());
app.use(cors());
app.use(helmet());

db.connect();

app.get('/', (req, res, next) => {
  res.send('Hello, world');
})

app.use(appRoute);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({msg: err.message || err});
})

const {PORT} = process.env;
app.listen(PORT, () => console.log(`http server is running at ${PORT}`))
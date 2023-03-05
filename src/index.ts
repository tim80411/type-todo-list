import express, {NextFunction, Request, Response} from 'express';
import path from 'path';
import dotenv from "dotenv";
import cors from 'cors';

import appRoute from "./app/app.routing";

const app = express();

app.use(express.json());
app.use(cors());

const envPath = path.resolve(__dirname, `./env/${process.env.NODE_ENV}.env`);
dotenv.config({path: envPath});


app.get('/', (req, res, next) => {
  res.send('Hello, world');
})

app.use(appRoute);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({msg: err.message || err});
})

const {PORT} = process.env;
app.listen(PORT, () => console.log(`http server is running at ${PORT}`))
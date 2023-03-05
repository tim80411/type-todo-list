import express from 'express';
import path from 'path';
import dotenv from "dotenv";

import appRoute from "./app/app.routing";

const app = express();

app.use(express.json());

const envPath = path.resolve(__dirname, `./env/${process.env.NODE_ENV}.env`);
dotenv.config({path: envPath});


app.get('/', (req, res, next) => {
  res.send('Hello, world');
})

app.use(appRoute);

const {PORT} = process.env;
app.listen(PORT, () => console.log(`http server is running at ${PORT}`))
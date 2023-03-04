import express from 'express';
import path from 'path';
import dotenv from "dotenv";


const app = express();

const envPath = path.resolve(__dirname, `./env/${process.env.NODE_ENV}.env`);
dotenv.config({path: envPath});


app.get('/', (req, res, next) => {
  res.send('Hello, world');
})

const {PORT} = process.env;
app.listen(PORT, () => console.log(`http server is running at ${PORT}`))
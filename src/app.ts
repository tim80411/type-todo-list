import express, {ErrorRequestHandler} from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import {AppRoute} from './app.routing';
import {DefaultException} from './exceptions/default.exception';
import {Database} from './database';

export class App {
  private app = express();

  constructor() {
    this.setEnvironment();
    this.setHelmet();
    this.setCors();
    this.registerRoute();
    this.setException();
  }

  public boot(): void {
    this.app.listen(process.env.PORT, () => console.log(`API Server is running at port ${process.env.PORT}.`))
  }

  public launchDatabase(): void {
    const database = new Database();
    database.connect();
  }

  private setException() {
    this.app.use(DefaultException);
  }

  private setHelmet(): void {
    this.app.use(helmet());
  }

  private setCors(): void {
    this.app.use(cors());
  }

  private setEnvironment(): void {
    dotenv.config({path: path.resolve(__dirname, `./env/${process.env.NODE_ENV}.env`)});
  }

  private registerRoute(): void {
    const route = new AppRoute();
    this.app.use('/', route.router);
  }
}
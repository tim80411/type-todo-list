import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import passport from 'passport';

import {AppRoute} from './app.routing';
import {Database} from './database';
import {DefaultException} from './exceptions/default.exception';
import {JWTException} from './exceptions/jwt.exception';
import {ResponseErrorException} from './exceptions/response-error.exception';

export class App {
  private app = express();
  private route!: AppRoute;

  constructor() {
    this.setEnvironment();
    this.setHelmet();
    this.setCors();
    this.setPassport();
    this.registerRoute();
    this.setException();
  }

  public boot(): void {
    console.log('Before listening from port');
    this.app.listen(process.env.PORT, () => console.log(`API Server is running at port ${process.env.PORT}.`))
  }

  public launchDatabase(): void {
    const database = new Database();
    database.connect();
  }

  private setException() {
    this.app.use(JWTException);
    this.app.use(ResponseErrorException);
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
    this.route = new AppRoute();
    this.app.use('/', this.route.router);
  }

  private setPassport(): void {
    passport.initialize();
  }
}
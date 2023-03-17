import express from 'express';

import {RouteBase} from '../../../bases/route.base';
import {LocalAuthController} from './local-auth.controller';

export class LocalAuthRouting extends RouteBase {
  protected controller!: LocalAuthController;

  protected initial(): void {
    this.controller = new LocalAuthController();
    super.initial();
  }

  protected registerRoute(): void {
    this.router.route('/signup')
      .post(express.json(), this.responseHandler(this.controller.signup))
  }
}
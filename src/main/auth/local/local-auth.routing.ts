import express from 'express';

import {RouteBase} from '../../../bases/route.base';
import {LocalAuthController} from './local-auth.controller';
import {LocalAuthSignupPipe} from './local-auth.pipe';

export class LocalAuthRouting extends RouteBase {
  protected controller!: LocalAuthController;
  protected pipe!: LocalAuthSignupPipe;

  protected initial(): void {
    this.controller = new LocalAuthController();
    this.pipe = new LocalAuthSignupPipe();
    super.initial();
  }

  protected registerRoute(): void {
    this.router.route('/signup')
      .post(express.json(), this.pipe.transform(), this.responseHandler(this.controller.signup));

    this.router.route('/signin')
      .post(express.json(), this.responseHandler(this.controller.signin));
  }
}
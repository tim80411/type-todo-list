import {expressjwt as JWTGuard} from 'express-jwt';

import {RouteBase} from "../../bases/route.base";
import {TodoRoute} from "./todo/todo.routing";

export class ApiRoute extends RouteBase {
  constructor() {
    super();
  }

  protected registerRoute(): void {
    const todoRoute = new TodoRoute();
    this.router.use(JWTGuard({secret: process.env.JWT_SIGN as string, requestProperty: 'payload', algorithms: ['HS256']}))
    this.router.use('/todo', todoRoute.router);
  }
}
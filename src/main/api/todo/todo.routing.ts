import express from 'express';

import {RouteBase} from '../../../bases/route.base';
import {TodoController} from './todo.controller';

export class TodoRoute extends RouteBase {
  protected controller!: TodoController;


  constructor() {
    super();
  }

  protected initial(): void {
    this.controller = new TodoController();
    super.initial()
  }

  protected registerRoute(): void {
    this.router.get('/', this.responseHandler(this.controller.getTodos));
    this.router.route('/').post(express.json(), this.responseHandler(this.controller.addTodo));
  }
}

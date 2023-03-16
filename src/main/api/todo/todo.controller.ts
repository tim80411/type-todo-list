import {Request} from 'express';
import {QueryOptions} from 'mongoose';

import {ResponseObject} from '../../../common/response/response.object';
import {ControllerBase} from "../../../bases/controller.base";
import {HttpStatus} from '../../../types/response.type';
import {TodoModel} from '../../../models/todo.model';
import {TodoDTO} from '../../../dtos/todo.dto';
import {DefaultQuery} from '../../../types/request.type';
import {TodoService} from './todo.service';


export class TodoController extends ControllerBase {
  private readonly TodoSvc = new TodoService();

  public async getTodos(
    req: Request,
  ): Promise<ResponseObject> {
    if (req.query.throwError === 'true') throw new Error('errorQQ');

    const {limit, skip} = req.query;
    const dtos = this.TodoSvc.getTodos(Number(limit), Number(skip));

    return super.formatResponse(dtos, HttpStatus.OK)
  }

  public async addTodo(
    req: Request,
  ): Promise<ResponseObject> {
    const {content} = req.body;
    const dto = await this.TodoSvc.addTodo(content);

    return super.formatResponse(dto, HttpStatus.CREATED);
  }

  public async completedTodo(req: Request): Promise<ResponseObject> {
    const {id} = req.params;
    const {completed} = req.body;

    const dto = await this.TodoSvc.completedTodo(id, completed);


    if (!dto) {
      return super.formatResponse('Not found.', HttpStatus.NOT_FOUND);
    }

    return super.formatResponse(dto, HttpStatus.OK);
  }

  public async removeTodo(req: Request): Promise<ResponseObject> {
    const {id} = req.params;
    const dto = await this.TodoSvc.removeTodo(id);
    if (!dto) {
      return super.formatResponse('Not found.', HttpStatus.NOT_FOUND);
    }
    return super.formatResponse(null, HttpStatus.NO_CONTENT);
  }
}
import {Request} from 'express';

import {ResponseObject} from '../../../common/response/response.object';
import {ControllerBase} from "../../../bases/controller.base";
import {HttpStatus} from '../../../types/response.type';
import {TodoService} from './todo.service';
import {JWTPayloadDTO} from '../../../dtos/jwt-payload.dto';


export class TodoController extends ControllerBase {
  private readonly TodoSvc = new TodoService();

  public async getTodos(
    req: Request,
  ): Promise<ResponseObject> {
    if (req.query.throwError === 'true') throw new Error('errorQQ');

    const {limit, skip} = req.query;
    const payload = new JWTPayloadDTO(req.payload);
    const dtos = await this.TodoSvc.getTodos(payload, Number(limit), Number(skip));

    return super.formatResponse(dtos, HttpStatus.OK)
  }

  public async addTodo(
    req: Request,
  ): Promise<ResponseObject> {
    const {content} = req.body;
    const payload = new JWTPayloadDTO(req.payload);
    const dto = await this.TodoSvc.addTodo(payload, content);

    return super.formatResponse(dto, HttpStatus.CREATED);
  }

  public async completedTodo(req: Request): Promise<ResponseObject> {
    const {id} = req.params;
    const {completed} = req.body;

    const payload = new JWTPayloadDTO(req.payload);
    const dto = await this.TodoSvc.completedTodo(payload, id, completed);


    if (!dto) {
      return super.formatResponse('Not found.', HttpStatus.NOT_FOUND);
    }

    return super.formatResponse(dto, HttpStatus.OK);
  }

  public async removeTodo(req: Request): Promise<ResponseObject> {
    const {id} = req.params;

    const payload = new JWTPayloadDTO(req.payload);
    const dto = await this.TodoSvc.removeTodo(payload, id);
    if (!dto) {
      return super.formatResponse('Not found.', HttpStatus.NOT_FOUND);
    }
    return super.formatResponse(null, HttpStatus.NO_CONTENT);
  }
}
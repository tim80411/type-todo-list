import {Request, Response, NextFunction} from 'express';

import {ResponseObject} from '../../../common/response/response.object';
import {ControllerBase} from "../../../bases/controller.base";
import {HttpStatus} from '../../../types/response.type';
import {TodoModel} from '../../../models/todo.model';
import {TodoDTO} from '../../../dtos/todo.dto';


export class TodoController extends ControllerBase {
  public async getTodos(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<ResponseObject> {
    if (req.query.throwError === 'true') throw new Error('errorQQ')

    return super.formatResponse(req.query, HttpStatus.OK)
  }

  public async addTodo(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<ResponseObject> {
    const {content} = req.body;

    // TODO: refactor by using same source: db maybe
    const todo = new TodoModel({content, completed: false});
    const document = await todo.save();
    const dto = new TodoDTO(document);

    return super.formatResponse(dto, HttpStatus.CREATED);
  }
}
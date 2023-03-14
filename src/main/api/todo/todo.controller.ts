import {Request, Response, NextFunction} from 'express';

import {ResponseObject} from '../../../common/response/response.object';
import {ControllerBase} from "../../../bases/controller.base";
import {HttpStatus} from '../../../types/response.type';
import {TodoModel} from '../../../models/todo.model';
import {TodoDTO} from '../../../dtos/todo.dto';
import {DefaultQuery} from '../../../types/request.type';
import {QueryOptions} from 'mongoose';


export class TodoController extends ControllerBase {
  public async getTodos(
    req: Request,
  ): Promise<ResponseObject> {
    if (req.query.throwError === 'true') throw new Error('errorQQ')

    const {limit, skip} = req.query;
    const truthLimit = Math.min(Number(limit), DefaultQuery.MAX_LIMIT) || DefaultQuery.LIMIT;
    const truthSkip = Number(skip) || DefaultQuery.SKIP;

    const todos = await TodoModel.find().skip(truthSkip).limit(truthLimit).exec();
    const dtos = todos.map(todo => new TodoDTO(todo));

    return super.formatResponse(dtos, HttpStatus.OK)
  }

  public async addTodo(
    req: Request,
  ): Promise<ResponseObject> {
    const {content} = req.body;

    // TODO: refactor by using same source: db maybe
    const todo = new TodoModel({content, completed: false});
    const document = await todo.save();
    const dto = new TodoDTO(document);

    return super.formatResponse(dto, HttpStatus.CREATED);
  }

  public async completedTodo(req: Request): Promise<ResponseObject> {
    const {id} = req.params;
    const {completed} = req.body;
    const options: QueryOptions = {
      new: true,
      runValidators: true,
    };
    const todo = await TodoModel.findByIdAndUpdate(id, {completed}, options);
    if (!todo) {
      return super.formatResponse('Not found.', HttpStatus.NOT_FOUND);
    }
    const dto = new TodoDTO(todo);
    return super.formatResponse(dto, HttpStatus.OK);
  }

  public async removeTodo(req: Request): Promise<ResponseObject> {
    const {id} = req.params;
    const todo = await TodoModel.findByIdAndRemove(id);
    if (!todo) {
      return super.formatResponse('Not found.', HttpStatus.NOT_FOUND);
    }
    return super.formatResponse(null, HttpStatus.NO_CONTENT);
  }
}
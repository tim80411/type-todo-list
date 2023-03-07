import {Request, Response, NextFunction} from 'express';
import {ControllerBase} from "../../../bases/controller.base";
import {HttpStatus} from '../../../types/response.type';

export class TodoController extends ControllerBase {
  public async getTodos(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const obj = super.formatResponse(req.query, HttpStatus.OK)

    res.status(obj.status).json(obj);
  }
}
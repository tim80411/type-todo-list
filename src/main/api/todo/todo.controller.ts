import {ResponseObject} from '../../../common/response/response.object';
import {Request, Response, NextFunction} from 'express';
import {ControllerBase} from "../../../bases/controller.base";
import {HttpStatus} from '../../../types/response.type';

export class TodoController extends ControllerBase {
  public async getTodos(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<ResponseObject> {
    if (req.query.throwError === 'true') throw new Error('errorQQ')

    return super.formatResponse(req.query, HttpStatus.OK)
  }
}
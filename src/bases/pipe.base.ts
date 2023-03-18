import {Request, Response, NextFunction} from "express";
import {validationResult} from 'express-validator';

import {HttpStatus} from "../types/response.type";
import {ResponseError} from '../common/response/response-error.object';

export abstract class pipeBase {
  constructor() { }

  public abstract transform(): any[];

  protected validationHandler(req: Request, res: Response, next: NextFunction) {
    const errObj = validationResult(req);
    if (!errObj.isEmpty()) {
      const errs = errObj.array();
      throw new ResponseError(errs.map(err => err.msg), HttpStatus.UNPROCESSABLE);
    }
    next();
  }

}
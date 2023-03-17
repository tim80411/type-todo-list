import {Request} from 'express';

import {ControllerBase} from '../../../bases/controller.base';
import {LocalAuthService} from './local-auth.service';
import {ResponseObject} from '../../../common/response/response.object';
import {HttpStatus} from '../../../types/response.type';


export class LocalAuthController extends ControllerBase {

  protected readonly localAuthSvc = new LocalAuthService();

  public async signup(req: Request): Promise<ResponseObject> {
    const {username, password, email} = req.body;
    const user = await this.localAuthSvc.addUser(username, password, email);
    return super.formatResponse(user, HttpStatus.CREATED);
  }

}
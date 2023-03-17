import JWT from 'jsonwebtoken';

import {LocalAuthDocument} from '../../../models/local-auth.model';
import {LocalAuthRepository} from '../../../repositories/local-auth.repository';
import {HttpStatus} from '../../../types/response.type';

export class LocalAuthService {
  private readonly localAuthRepo = new LocalAuthRepository();

  public async addUser(username: string, password: string, email: string) {
    const existUser = await this.localAuthRepo.getUser({username, email});
    if (existUser) {
      const error = new Error('使用者名稱或電子信箱已被使用');
      (error as any).status = HttpStatus.CONFLICT;
      throw error;
    }
    const user = await this.localAuthRepo.addUser(username, password, email);
    return user;
  }

  public generateJWT(user: LocalAuthDocument): string {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return JWT.sign({
      _id: user._id,
      username: user.username,
      exp: expiry.getTime() / 1000
    }, (process.env.JWT_SIGN as string));
  }
}

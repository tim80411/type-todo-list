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
}
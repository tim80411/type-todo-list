import {HttpStatus} from "types/response.type";

export class ResponseObject {
  public readonly status: HttpStatus;
  public readonly message: string = '';
  public readonly data: any = null;

  constructor(options: {status?: HttpStatus, message?: string, data?: any}) {
    this.status = options.status || HttpStatus.INTERNAL_ERROR;
    this.message = options.message || this.message;
    this.data = options.data || this.data;
  }
}

import {RouteBase} from '../../../bases/route.base';

export class TodoRoute extends RouteBase {

  constructor() {
    super();
  }

  protected registerRoute(): void {
    this.router.get('/test', (req, res, next) => res.send('todo test.'));
  }

}

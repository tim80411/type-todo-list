import {RouteBase} from './bases/route.base';
import {ApiRoute} from './main/api/api.routing';
import {AuthRoute} from './main/auth/auth.routing';

export class AppRoute extends RouteBase {
  constructor() {
    super();
  }

  protected registerRoute(): void {
    const apiRoute = new ApiRoute();
    const authRoute = new AuthRoute();
    this.router.use('/api', apiRoute.router);
    this.router.use('/auth', authRoute.router);
  }

};

import {RouteBase} from './bases/route.base';
import {ApiRoute} from './main/api/api.routing';

export class AppRoute extends RouteBase {
  constructor() {
    super();
  }

  protected registerRoute(): void {
    const apiRoute = new ApiRoute();
    this.router.use('/api', apiRoute.router);
  }

};

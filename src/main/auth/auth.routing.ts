import {RouteBase} from "../../bases/route.base";
import {LocalAuthRouting} from "./local/local-auth.routing";

export class AuthRoute extends RouteBase {
  constructor() {
    super();
  }

  protected registerRoute(): void {
    const localAuthRoute = new LocalAuthRouting();
    this.router.use('/local', localAuthRoute.router);
  }
}
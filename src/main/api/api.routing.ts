import {RouteBase} from "../../bases/route.base";
import {TodoRoute} from "./todo/todo.routing";

export class ApiRoute extends RouteBase {
  constructor() {
    super();
  }

  protected registerRoute(): void {
    const todoRoute = new TodoRoute();
    this.router.use('/todo', todoRoute.router);
  }
}
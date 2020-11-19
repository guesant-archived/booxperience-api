import { UsersController } from "@/controllers/UsersController";
import { RoutesBase } from "@/routing/routes/RoutesBase";

export class UsersRoutes extends RoutesBase {
  constructor() {
    super(UsersController);
  }
  getRoutes() {
    this.addRoute("/users/login", "post", "loginUser");
    return this.routes;
  }
}

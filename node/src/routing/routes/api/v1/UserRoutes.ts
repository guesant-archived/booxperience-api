import { UserController } from "@/controllers/UserController";
import { RoutesBase } from "@/routing/routes/RoutesBase";

export class UserRoutes extends RoutesBase {
  constructor() {
    super(UserController);
  }
  getRoutes() {
    this.addRoute("/user", "get", "getLoggedUserInfo");
    return this.routes;
  }
}

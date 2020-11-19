import { IndexController } from "@/controllers/IndexController";
import { RoutesBase } from "@/routing/routes/RoutesBase";

export class IndexRoutes extends RoutesBase {
  constructor() {
    super(IndexController);
  }
  getRoutes() {
    this.addRoute("/", "get", "index");
    return this.routes;
  }
}

import {
  IndexController,
  IndexControllerActions,
} from "@/controllers/IndexController";
import { RoutesBase } from "@/routing/routes/RoutesBase";

export class IndexRoutes extends RoutesBase<any, IndexControllerActions> {
  constructor() {
    super(IndexController);
  }
  getRoutes() {
    this.addRoute("/", "get", "index");
    return this.routes;
  }
}

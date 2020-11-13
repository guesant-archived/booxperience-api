import { ControllerBase } from "@/controllers/ControllerBase";

export type IRoutesBaseRoute<
  Controller extends typeof ControllerBase = typeof ControllerBase
> = {
  uri: string;
  action: string;
  httpMethod: string;
  controllerClass: Controller;
};

export class RoutesBase<
  Controller extends typeof ControllerBase = typeof ControllerBase,
  Action extends string = string
> {
  routes: IRoutesBaseRoute<Controller>[];
  ControllerClass: Controller;
  constructor(ControllerClass: any) {
    this.routes = [];
    this.ControllerClass = ControllerClass;
  }
  addRoute(uri: string, httpMethod: string, action: Action) {
    this.routes.push({
      uri,
      action,
      httpMethod,
      controllerClass: this.ControllerClass,
    });
  }
  getRoutes() {
    return this.routes;
  }
}

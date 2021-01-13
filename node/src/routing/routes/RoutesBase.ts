import { ControllerBase } from "@/controllers/ControllerBase";
import { IRoutesBaseRoute } from "@/types/IRoutesBaseRoute";
import { IRoute } from "express";
import { Class } from "ts-toolbelt";

export class RoutesBase<
  IControllerClass extends Class.Class<any, ControllerBase> = Class.Class<
    any,
    ControllerBase
  >
> {
  routes: IRoutesBaseRoute<IControllerClass>[];
  controllerClass: IControllerClass;
  constructor(controllerClass: IControllerClass) {
    this.routes = [];
    this.controllerClass = controllerClass;
  }
  addRoute(uri: string, httpMethod: keyof IRoute, action: string) {
    const { controllerClass } = this;
    this.routes.push({
      uri,
      action,
      httpMethod,
      controllerClass,
    });
  }
  getRoutes() {
    return this.routes;
  }
}

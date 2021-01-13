import { RoutesBase } from "@/routing/routes/RoutesBase";
import { ICreateRouteBoundActionCallback } from "@/types/ICreateRouteBoundActionCallback";
import { IRegisterRouteCallback } from "@/types/IRegisterRouteCallback";

export class Router {
  routes: RoutesBase[];
  constructor(routes: RoutesBase[]) {
    this.routes = routes;
  }
  registerRoutes(
    registerRouteCallback: IRegisterRouteCallback,
    createRouteBoundActionCallback: ICreateRouteBoundActionCallback,
  ) {
    this.routes.forEach((builder) => {
      const routes = builder.getRoutes();
      routes.forEach((routeData) => {
        const boundAction = createRouteBoundActionCallback(
          routeData.controllerClass,
          routeData.action,
        );
        registerRouteCallback(routeData.uri, routeData.httpMethod, boundAction);
      });
    });
  }
}

import { RoutesBase } from "@/routing/routes/RoutesBase";
import { RoutesCollection } from "@/routing/RoutesCollection";
import { ICreateRouteBoundAction } from "@/types/ICreateRouteBoundAction";
import { IRegisterRouteCallback } from "@/types/IRegisterRouteCallback";

export class Router {
  routes: RoutesBase[];
  constructor(routes: any[]) {
    this.routes = routes;
  }
  registerRoutes(
    registerRouteCallback: IRegisterRouteCallback,
    createRouteBoundActionCallback: ICreateRouteBoundAction,
  ) {
    this.routes.forEach((builder) => {
      const routes = builder.getRoutes();
      routes.forEach((routeData) => {
        RoutesCollection.addRouteData(
          routeData.action,
          routeData.controllerClass,
          { uri: routeData.uri, httpMethod: routeData.httpMethod },
        );
        const boundAction = createRouteBoundActionCallback(
          routeData.controllerClass,
          routeData.action,
        );
        registerRouteCallback(routeData.uri, routeData.httpMethod, boundAction);
      });
    });
  }
}

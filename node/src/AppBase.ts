import { ControllerBase } from "@/controllers/ControllerBase";
import { Router } from "@/routing/Router";
import { URIGenerator } from "@/routing/URIGenerator";
import { IBoundActions } from "@/types/IBoundActions";
import { IRequest } from "@/types/IRequest";
import { IResponse } from "@/types/IResponse";

export abstract class AppBase<AppRouter extends Router = Router> {
  router: AppRouter;
  constructor(router: AppRouter) {
    this.router = router;
    this._registerRoute = this._registerRoute.bind(this);
    this._createRouteBoundAction = this._createRouteBoundAction.bind(this);
  }
  abstract _registerRoute(
    uri: string,
    httpMethod: string,
    boundAction: IBoundActions,
  ): void;
  _createRouteBoundAction(
    controllerClass: typeof ControllerBase,
    method: string,
  ) {
    const result = [
      (req: IRequest, res: IResponse) => {
        (this._buildControllerInstance(controllerClass, req, res) as any)[
          method
        ]();
      },
    ];
    return result;
  }
  _buildControllerInstance(
    ControllerClass: typeof ControllerBase,
    req: IRequest,
    res: IResponse,
  ) {
    const { params, query, body } = req;
    return new ControllerClass({
      params,
      query,
      body,
      uriGenerator: new URIGenerator(),
      send: (statusCode, resource, location) => {
        if (location) {
          res.location(location);
        }
        res.status(statusCode || 200).send(resource);
      },
    });
  }
  run() {
    this.router.registerRoutes(
      this._registerRoute,
      this._createRouteBoundAction,
    );
  }
}

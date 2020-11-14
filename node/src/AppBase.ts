import { ControllerBase } from "@/controllers/ControllerBase";
import { Router } from "@/routing/Router";
import { URIGenerator } from "@/routing/URIGenerator";
import { IBoundActions } from "@/types/IBoundActions";
import { IRequest } from "@/types/IRequest";
import { IResponse } from "@/types/IResponse";
import { Repository } from "./repositories/Repository";
import { Security } from "./security/security";

export abstract class AppBase<AppRouter extends Router = Router> {
  router: AppRouter;
  repository: Repository;
  security: Security;
  constructor(router: AppRouter, repository: Repository, security: Security) {
    this.router = router;
    this.repository = repository;
    this.security = security;
    this._registerRoute = this._registerRoute.bind(this);
    this._createRouteBoundAction = this._createRouteBoundAction.bind(this);
  }
  abstract _registerRoute(
    uri: string,
    httpMethod: string,
    boundAction: IBoundActions,
  ): void;
  abstract _registerAuthRoute(arg0: any): void;
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
    result.unshift(
      this.security.authenticate() as any,
      this.security.authorise(controllerClass.name, method) as any,
    );
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
      repository: this.repository,
      uriGenerator: new URIGenerator(this.security, (req as any).user.role),
      send: (statusCode, resource, location) => {
        if (location) {
          res.location(location);
        }
        res.status(statusCode || 200).send(resource);
      },
    });
  }
  run() {
    this.repository.registerRepositories();
    this.router.registerRoutes(
      this._registerRoute,
      this._createRouteBoundAction,
    );
    this._registerAuthRoute(this.security.issueToken());
  }
}

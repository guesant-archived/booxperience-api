import {
  ControllerBase,
  ControllerBaseParams,
} from "@/controllers/ControllerBase";
import { Router } from "@/routing/Router";
import { Security } from "@/security/Security";
import { IControllerAuth } from "@/types/IControllerAuth";
import { IRoute, Request, RequestHandler, Response } from "express";

export abstract class AppBase<AppBaseRouter extends Router = Router> {
  router: AppBaseRouter;
  security: Security;
  constructor(router: AppBaseRouter, security: Security) {
    this.router = router;
    this.security = security;
    this._registerRoute = this._registerRoute.bind(this);
    this._createRouteBoundAction = this._createRouteBoundAction.bind(this);
  }
  abstract _registerRoute(
    uri: string,
    httpMethod: keyof IRoute,
    boundAction: RequestHandler[],
  ): void;
  _createRouteBoundAction(
    controllerClass: new (arg0: any) => ControllerBase,
    method: any,
  ): RequestHandler[] {
    return [
      ...this.security.authenticate(),
      (req, _res, next) => {
        if (!(req as any).auth) {
          (req as any).auth = {
            isAuthed: false,
            user: { role: "guest" },
          };
        }
        next();
      },
      async (req, res) => {
        const controllerInstance = this._buildControllerInstance(
          controllerClass,
          req,
          res,
        );
        await controllerInstance.exec(method);
      },
    ];
  }
  _buildControllerInstance(
    controllerClass: new (arg0: ControllerBaseParams) => ControllerBase,
    req: Request,
    res: Response,
  ) {
    const { params, query, body, auth } = req as typeof req & {
      auth: IControllerAuth;
    };
    return new controllerClass({
      auth,
      body,
      query,
      params,
      send: (statusCode: number = 200, resource?: any, location?: string) => {
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

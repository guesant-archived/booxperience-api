import { RoutesCollection } from "@/routing/RoutesCollection";
import { Security } from "@/security/security";
import { IRequestParams } from "@/types/IRequestParams";
import { twoDimensionalArrayToObject } from "@/utils/two-dimensional-array-to-object";
import queryString from "query-string";

export class URIGenerator<Params extends IRequestParams = IRequestParams> {
  security: Security;
  role: any;
  constructor(security: Security, role: any) {
    this.security = security;
    this.role = role;
  }
  getURI(controllerActionName: string, params?: Params, id?: string) {
    return new Promise((resolve) => {
      const caArray = controllerActionName.split("_");
      const routeData = RoutesCollection.getRouteAction(caArray[0], caArray[1]);
      this.security.hasAccess(
        this.role,
        routeData.controller,
        routeData.action,
        (err: any, can: boolean) => {
          if (can) {
            const uri = params
              ? this._bindParams(routeData.uri, params)
              : routeData.uri;
            resolve({
              id: id || routeData.action,
              method: routeData.method,
              uri,
            });
          } else {
            resolve(null);
          }
        },
      );
    });
  }
  _bindParams(uri: string, params: Params) {
    let match;
    let replacement;
    let uriParam = uri;
    const replacedParams: string[] = [];
    while ((match = /:([\w_]+)\??/gi.exec(uriParam))) {
      replacement =
        (params &&
          match[1] !== undefined &&
          (params as any)[match[1]].toString()) ||
        "";
      if (replacement === "") {
        uriParam = uriParam.replace(`/${match[0]}`, "");
      } else {
        uriParam = uriParam.replace(match[0], replacement);
        replacedParams.push(match[1]);
      }
    }
    const paramsForQueryString = twoDimensionalArrayToObject<Params>(
      Object.keys(params)
        .filter((p) => !replacedParams.includes(p))
        .map((p) => [p, params[p]]),
    );
    if (Object.keys(paramsForQueryString).length > 0) {
      uriParam = `${uriParam}?${queryString.stringify(paramsForQueryString)}`;
    }
    return uriParam;
  }
}

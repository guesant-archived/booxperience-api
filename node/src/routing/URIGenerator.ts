import { RoutesCollection } from "@/routing/RoutesCollection";
import { IRequestParams } from "@/types/IRequestParams";
import { twoDimensionalArrayToObject } from "@/utils/two-dimensional-array-to-object";
import queryString from "query-string";

export class URIGenerator<Params extends IRequestParams = IRequestParams> {
  getURI(controllerActionName: string, params: Params, id: string) {
    const [name, action] = controllerActionName.split("_");
    const { method, uri } = RoutesCollection.getRouteAction(name, action);
    return {
      method,
      id: id || action,
      uri: params ? this._bindParams(uri, params) : uri,
    };
  }
  _bindParams(uri: string, params: Params) {
    let match;
    let replacement;
    let uriParam = uri;
    const replacedParams: string[] = [];
    while ((match = /:([\w_]+)\??/gi.exec(uriParam))) {
      replacement = params[match[1]].toString() || "";
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

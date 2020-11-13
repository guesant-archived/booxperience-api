import { ControllerBase } from "@/controllers/ControllerBase";

export type RouteData = {
  uri: string;
  action: string;
  method: string;
  controller: string;
};

export type RouteActions = {
  [key: string]: RouteData;
};

export type RoutesDict = {
  [key: string]: RouteActions;
};

export class RoutesCollectionBuilder {
  collectionList: RoutesDict;
  constructor() {
    this.collectionList = {};
  }
  addRouteData(
    action: string,
    controller: typeof ControllerBase,
    routeData: { [key: string]: any } = {},
  ) {
    (this.collectionList as any)[controller.name] = {
      ...(this.collectionList[controller.name] ?? {}),
      [action]: {
        ...routeData,
        action,
        controller: controller.name,
      },
    };
  }
  hasRouteAction(name: string, action: string) {
    const { collectionList } = this;
    const { hasOwnProperty } = Object.prototype;
    return (
      hasOwnProperty.call(collectionList, name) &&
      hasOwnProperty.call(collectionList[name], action)
    );
  }
  getRouteAction(name: string, action: string): RouteData {
    if (this.hasRouteAction(name, action)) {
      return this.collectionList[name][action];
    }
    throw `Route action ${name}_${action} is not implemented.`;
  }
}

export const RoutesCollection = new RoutesCollectionBuilder();

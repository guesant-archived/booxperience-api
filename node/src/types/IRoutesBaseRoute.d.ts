import { ControllerBase } from "@/controllers/ControllerBase";
import { IRoute } from "express";
import { Class } from "ts-toolbelt";

export type IRoutesBaseRoute<
  IControllerClass extends Class.Class<any, ControllerBase> = Class.Class<
    any,
    ControllerBase
  >
> = {
  uri: string;
  action: string;
  httpMethod: keyof IRoute;
  controllerClass: IControllerClass;
};

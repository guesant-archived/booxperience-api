import { ControllerBase } from "@/controllers/ControllerBase";
import { RequestHandler } from "express";

export type ICreateRouteBoundActionCallback = (
  controllerClass: new (...args: any[]) => ControllerBase,
  method: any,
) => RequestHandler[];

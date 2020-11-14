import { IRoute, RequestHandler } from "express";

export type IRegisterRouteCallback = (
  uri: string,
  httpMethod: keyof IRoute,
  boundAction: RequestHandler[],
) => void;

import {
  IControllerAuth,
  IControllerAuthAuthed,
} from "@/types/IControllerAuth";
import { IControllerSend } from "@/types/IControllerSend";
import { IRequestParams } from "@/types/IRequestParams";
import { IRequestQuery } from "@/types/IRequestQuery";

export type ControllerBaseValidMethods =
  | "error"
  | "created"
  | "ok"
  | "noContent";

export type ControllerBaseParams<
  Body = any,
  Auth = IControllerAuth,
  Params = IRequestParams,
  Query = IRequestQuery
> = {
  auth: Auth;
  body: Body;
  query: Query;
  params: Params;
  send: IControllerSend;
};

export class ControllerBase<
  Body extends any = any,
  Auth extends IControllerAuth = IControllerAuth,
  Params extends IRequestParams = IRequestParams,
  Query extends IRequestQuery = IRequestQuery
> {
  auth: Auth;
  body: Body;
  send: IControllerSend;
  query: Query;
  params: Params;
  constructor(options: ControllerBaseParams<Body, Auth, Params, Query>) {
    const { auth, body, query, params, send } = options;
    this.auth = auth;
    this.body = body;
    this.send = send;
    this.query = query;
    this.params = params;
  }
  async exec(
    method: ControllerBaseValidMethods,
    ...args: Parameters<ControllerBase[typeof method]>
  ) {
    if (typeof this[method] === "function") {
      await (this[method] as (...fnargs: typeof args) => any).call(this, args);
    }
  }
  error(err: any) {
    const statusCode = err.statusCode || err.status || 500;
    this.send(statusCode, err);
  }
  created(data: any = "", location: string = "") {
    if (location) {
      this.send(201, null, location);
      return;
    }
    this.send(201, data);
  }
  ok(data: any) {
    this.send(200, data);
  }
  noContent() {
    this.send(204);
  }
}

export class ControllerBaseAuthed<
  Body = any,
  Params extends IRequestParams = IRequestParams,
  Query extends IRequestQuery = IRequestQuery
> extends ControllerBase<Body, IControllerAuthAuthed, Params, Query> {}

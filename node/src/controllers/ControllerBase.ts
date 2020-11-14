import { IRequestParams } from "@/types/IRequestParams";
import { IRequestQuery } from "@/types/IRequestQuery";
import { IControllerSend } from "@/types/IControllerSend";

export type ControllerBaseValidMethods =
  | "error"
  | "created"
  | "ok"
  | "noContent";

export class ControllerBase<
  Body = any,
  Params = IRequestParams,
  Query = IRequestQuery
> {
  body: Body;
  send: IControllerSend;
  query: Query;
  params: Params;
  constructor({
    body,
    query,
    params,
    send,
  }: {
    body: Body;
    query: Query;
    params: Params;
    send: IControllerSend;
  }) {
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

import { IRequestParams } from "@/types/IRequestParams";
import { IRequestQuery } from "@/types/IRequestQuery";
import { ISend } from "@/types/ISend";

export class ControllerBase<
  Params = IRequestParams,
  Query = IRequestQuery,
  Body = any
> {
  body: Body;
  send: ISend;
  query: Query;
  params: Params;
  constructor({
    body,
    send,
    query,
    params,
  }: {
    body: Body;
    send: ISend;
    query: Query;
    params: Params;
  }) {
    this.body = body;
    this.send = send;
    this.query = query;
    this.params = params;
  }
  error(err: any) {
    const status = err.statusCode || err.status;
    const statusCode = status || 500;
    this.send(statusCode, err);
  }
  created(location: string = "", data: any = "") {
    if (location) {
      this.send(201, null, location);
    }
    this.send(201, data);
  }
  ok(data = "") {
    this.send(200, data);
  }
  notContent() {
    this.send(204);
  }
}

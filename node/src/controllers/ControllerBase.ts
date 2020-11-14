import { Repository } from "@/repositories/Repository";
import { URIGenerator } from "@/routing/URIGenerator";
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
  uriGenerator: URIGenerator;
  repository: Repository;
  constructor({
    body,
    send,
    query,
    params,
    uriGenerator,
    repository,
  }: {
    body: Body;
    send: ISend;
    query: Query;
    params: Params;
    uriGenerator: URIGenerator;
    repository: Repository;
  }) {
    this.body = body;
    this.send = send;
    this.query = query;
    this.params = params;
    this.uriGenerator = uriGenerator;
    this.repository = repository;
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
  ok(data: any = "") {
    this.send(200, data);
  }
  notContent() {
    this.send(204);
  }
}

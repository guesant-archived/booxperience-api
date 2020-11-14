import { AppBase } from "@/AppBase";
import { Router } from "@/routing/Router";
import bodyParser from "body-parser";
import config from "config";
import express, { Express, Router as ExpressRouter } from "express";
import helmet from "helmet";
import morgan from "morgan";

export class ExpressApp extends AppBase {
  port: number;
  host: string;
  express: Express;
  expressRouter: ExpressRouter;
  constructor(router: Router) {
    super(router);
    this.port = config.get("api.port");
    this.host = config.get("api.host");
    this.express = express();
    this.express.use(helmet());
    config.has("logs.requests") &&
      config.get("logs.requests") &&
      this.express.use(morgan(config.get("logs.requests")));
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());
    this.expressRouter = express.Router();
  }
  _registerRoute(uri: string, httpMethod: string, boundAction: any) {
    (this.expressRouter.route(uri) as any)[httpMethod](boundAction);
  }
  run() {
    super.run();
    this.express.use("/api/v1", this.expressRouter);
    this.express.use((req, res) => {
      res.status(404).send({ url: `${req.originalUrl} not found` });
    });
    this.express.listen(this.port, this.host);
    console.log(`RESTful API server started on ${this.host}:${this.port}`);
  }
}

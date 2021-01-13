import { AppBase } from "@/AppBase";
import { Router } from "@/routing/Router";
import { Security } from "@/security/Security";
import { appLogs } from "@/services/AppLogs";
import bodyParser from "body-parser";
import config from "config";
import cors from "cors";
import errorHandler from "errorhandler";
import express, {
  Express,
  IRoute,
  RequestHandler,
  Router as ExpressRouter,
} from "express";
import helmet from "helmet";
import morgan from "morgan";

export class ExpressApp extends AppBase {
  host: string;
  port: number;
  express: Express;
  expressRouter: ExpressRouter;
  constructor(router: Router, security: Security) {
    super(router, security);
    this.host = config.get("api.host");
    this.port = config.get("api.port");
    this.express = express();
    this.express.use(helmet());
    this.express.use(cors());
    if (config.has("api.logs")) {
      const { requests } = config.get("api.logs") || {};
      requests && this.express.use(morgan(requests));
    }
    if (config.get("debug")) {
      this.express.use(errorHandler());
    }
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());
    this.expressRouter = express.Router();
  }
  _registerRoute(
    uri: string,
    httpMethod: keyof IRoute,
    requestHandlers: RequestHandler[],
  ) {
    this.expressRouter.route(uri)[httpMethod](requestHandlers);
  }
  run() {
    super.run();
    this.express.use("/api/v1", this.expressRouter);
    this.express.use((req, res) => {
      res.status(404).send({ url: `${req.originalUrl} not found` });
    });
    this.express.listen(this.port, this.host, () => {
      appLogs.info(`RESTful API server started on ${this.host}:${this.port}`);
    });
  }
}

import { ResponseError } from "@/interfaces/ResponseError";
import routes from "@/routes";
import { setupDB } from "@/utils/setup-db";
import config from "config";
import cors from "cors";
import errorhandler from "errorhandler";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

const isProduction = !config.get("debug");

async function main() {
  const app = express();
  app.use(helmet());
  config.has("api.logs") &&
    config.get("api.logs") &&
    app.use(morgan(config.get("api.logs")));
  app.use(cors());
  app.use(express.json());
  app.use(express.static(__dirname + "/public"));
  if (!isProduction) {
    app.use(errorhandler());
  }
  await setupDB();
  app.use("/", routes);
  app.use((_req, _res, next) => {
    next(new ResponseError("Not Found", 404));
  });
  const host: string = config.get("api.host");
  const port: number = config.get("api.port");
  app.listen(port, host, () => {
    console.log(`[info] - Listening at http://${host}:${port}`);
  });
}

main();

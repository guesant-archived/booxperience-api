import cors from "cors";
import dotenv from "dotenv";
import errorhandler from "errorhandler";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { ResponseError } from "./interfaces/ResponseError";
import routes from "./routes";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 1337;

function main() {
  const app = express();
  app.use(cors());
  app.use(helmet());
  app.use(morgan("common"));
  app.use(express.json());
  app.use(express.static(__dirname + "/public"));
  if (!isProduction) {
    app.use(errorhandler());
  }
  app.use("/", routes);
  app.use((_req, _res, next) => {
    next(new ResponseError("Not Found", 404));
  });
  // development error handler
  if (!isProduction) {
    app.use(
      (err: ResponseError, _req: express.Request, res: express.Response) => {
        console.log(err.stack);
        res.status(err.status || 500);
        res.json({
          errors: [
            {
              msg: err.message,
              error: err,
            },
          ],
        });
      },
    );
  }
  // production error handler
  app.use(
    (err: ResponseError, _req: express.Request, res: express.Response) => {
      res.status(err.status || 500);
      res.json({
        errors: [
          {
            msg: err.message,
            error: {},
          },
        ],
      });
    },
  );
  app.listen(PORT, () => {
    console.log(`[info] - Listening at http://0.0.0.0:${PORT}`);
  });
}

main();

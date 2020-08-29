import dotenv = require("dotenv");
import * as bodyParser from "body-parser";
import express = require("express");
import { ValidationError } from "@hapi/joi";

dotenv.config();

import { Sentry } from "./settings/sentry";
import { globalSettings } from "./settings/globals";
import { configureRoutes } from "./routes";
import { logger } from "./settings/logger";
import { BaseError } from "./responses/base-response";
import { errorCodes } from "./settings/error-codes";

const app: express.Application = express();
app.enable("etag");
app.set("etag", "strong");

const normalizePort: (value: string | number) => number = (value: string | number) => {
  const port: number = Number(value);
  if (isNaN(port)) {
    logger.error("Port must have numeric value");
    process.exit(1);
  }
  if (port > 0) return port;
  logger.error("Invalid port number");
  process.exit(1);
};

function run(): void {
  globalSettings();

  app.use(bodyParser.json({ limit: "5mb" }));
  app.use(bodyParser.json({ type: "application/*+json", limit: "50mb" }));
  app.use(bodyParser.urlencoded({
    extended: true,
    limit: "5mb"
  }));
  configureRoutes(app);
  app.use(async (err: BaseError & ValidationError, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err.isJoi) {
      err.status = 400;
      err.message = err.details[0].message;
      err.code = errorCodes.BAD_REQUEST.code;
      delete err.details;
    }
    if (!err.status || 500) {
      Sentry.captureException(err);
      return res.status(err.status || 500).json({
        name: err.name || "Error",
        code: err.code || "UNKNOWN",
        status: err.status || 500,
        message: "Something went wrong",
        details: null
      });
    }
    res.status(err.status).json({
      name: err.name || "Error",
      code: err.code || "UNKNOWN",
      status: err.status || 500,
      message: err.message,
      details: err.details || null
    });
  });

  const httpPort: number = normalizePort(process.env.PORT || 80);
  app.listen(httpPort, "0.0.0.0", () => {
    logger.info("Platform configuration server started", { port: httpPort });
  });
}

run();

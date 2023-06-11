import cors from "cors";
import helmet from "helmet";
import expressstatusmonitor from "express-status-validate";
import express, { Response } from "express";
import config from "../config";
import api from "../api";

export default (app: express.Application) => {
  // Health Check endpoints
  app.use(expressstatusmonitor);

  app.get("/iloveyou/:name", (req, res: Response) => {
    try {
      return res.status(200).send({
        uptime: Math.floor(process.uptime()),
        message: "I love you " + req.params.name + "!",
        timestamp: new Date(),
      });
    } catch (e: any) {
      return res.status(503).send({
        uptime: Math.floor(process.uptime()),
        message: e.message,
        timestamp: new Date(),
      });
    }
  });

  app.get("/healthcheck", (req, res: Response) => {
    try {
      return res.status(200).send({
        uptime: Math.floor(process.uptime()),
        message: "Healthy",
        timestamp: new Date(),
      });
    } catch (e: any) {
      return res.status(503).send({
        uptime: Math.floor(process.uptime()),
        message: e.message,
        timestamp: new Date(),
      });
    }
  });

  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable("trust proxy");

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Middleware that transforms the raw string of req.body into json
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Middleware that helps secure app by setting headers
  app.use(helmet());

  // Load API routes
  app.use(config.api.prefix, api());
};

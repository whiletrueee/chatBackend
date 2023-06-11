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
    const healthcheck = {
      uptime: process.uptime(),
      message: `i_love_you_soo_much_${req.params.name}`,
      timestamp: Date.now(),
    };
    try {
      return res.status(200).json(healthcheck);
    } catch (e) {
      return res.status(503).send();
    }
  });

  app.get("/healthcheck", (req, res: Response) => {
    const healthcheck = {
      uptime: process.uptime(),
      message: "OK",
      timestamp: Date.now(),
    };
    try {
      return res.status(200).json(healthcheck);
    } catch (e) {
      return res.status(503).send();
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

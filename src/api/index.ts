import { Router } from "express";
import chatController from "./chat/controller";

export default (): Router => {
  const app = Router();

  app.use("/chat", chatController);

  return app;
};

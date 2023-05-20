import { Router } from "express";
import chatController from "./chat/controller.chat";
import auth from "./auth/controller.auth";

export default (): Router => {
  const app = Router();

  app.use("/chat", chatController);
  app.use("/auth", auth);

  return app;
};

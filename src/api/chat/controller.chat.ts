import { Request, Response, Router } from "express";
import validate from "../../middlewares/validate";
import { recentChat, recieveChat, sendChat } from "./service.chat";
import {
  validateAuthorization,
  validateSendChat,
  validateRecieveChat,
  validateRecentChat,
} from "./model.chat";
import authValidate from "../../middlewares/authValidate";
const router = Router();

const sendChatController = async (req: Request, res: Response) => {
  try {
    const result = await sendChat(req.body, req.headers.authorization);
    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(err.status).json({ error: err.message, success: false });
  }
};

const recieveChatController = async (req: Request, res: Response) => {
  try {
    const result = await recieveChat(req.body, req.headers.authorization);
    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(err.status).json({ error: err.message, success: false });
  }
};

const recentChatController = async (req: Request, res: Response) => {
  try {
    const result = await recentChat(req.body, req.headers.authorization);
    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(err.status).json({ error: err.message, success: false });
  }
};

router.post(
  "/send",
  authValidate(validateAuthorization),
  validate(validateSendChat),
  sendChatController
);

router.get(
  "/recieve",
  authValidate(validateAuthorization),
  validate(validateRecieveChat),
  recieveChatController
);

router.get(
  "/recent",
  authValidate(validateAuthorization),
  validate(validateRecentChat),
  recentChatController
);


export default router;

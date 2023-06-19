import { Request, Response, Router } from "express";
import validate from "../../middlewares/validate";
import { allUsers, recieveChat, sendChat } from "./service.chat";
import {
  validateAuthorization,
  validateSendChat,
  validateParamRecentChat,
  validateParamMessages,
} from "./model.chat";
import authValidate from "../../middlewares/authValidate";
import validateParam from "../../middlewares/validateParam";
const router = Router();

const sendChatController = async (req: Request, res: Response) => {
  try {
    const result = await sendChat(req.body, req.headers.authorization);
    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(err.status).json({ error: err.message, success: false });
  }
};

const allUsersController = async (req: Request, res: Response) => {
  const userId = req.query.userId as string;
  try {
    const result = await allUsers(userId, req.headers.authorization);
    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(err.status).json({ error: err.message, success: false });
  }
};

const recieveChatController = async (req: Request, res: Response) => {
  try {
    const { from, to } = req.query;
    const result = await recieveChat(
      from as string,
      to as string,
      req.headers.authorization
    );
    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(err.status).json({ error: err.message, success: false });
  }
};

router.post(
  "/send-message",
  authValidate(validateAuthorization),
  validate(validateSendChat),
  sendChatController
);

router.get(
  "/recieve-messages",
  authValidate(validateAuthorization),
  validateParam(validateParamMessages),
  recieveChatController
);

router.get(
  "/all-users",
  authValidate(validateAuthorization),
  validateParam(validateParamRecentChat),
  allUsersController
);

export default router;

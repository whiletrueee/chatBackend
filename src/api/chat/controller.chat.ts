import { Request, Response, Router } from "express";
import validate from "../../middlewares/validate";
import {
  allUsers,
  messages,
  recentChat,
  recieveChat,
  sendChat,
} from "./service.chat";
import {
  validateAuthorization,
  validateSendChat,
  validateRecieveChat,
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

const recieveChatController = async (req: Request, res: Response) => {
  try {
    const result = await recieveChat(req.body, req.headers.authorization);
    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(err.status).json({ error: err.message, success: false });
  }
};

const recentChatController = async (req: Request, res: Response) => {
  const userId = req.query.userId as string;
  try {
    const result = await recentChat(userId, req.headers.authorization);
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

const messagesController = async (req: Request, res: Response) => {
  try {
    const { from, to } = req.query;
    const result = await messages(
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
  "/recieve",
  authValidate(validateAuthorization),
  validate(validateRecieveChat),
  recieveChatController
);

router.get(
  "/recent",
  authValidate(validateAuthorization),
  validateParam(validateParamRecentChat),
  recentChatController
);

router.get(
  "/all-users",
  authValidate(validateAuthorization),
  validateParam(validateParamRecentChat),
  allUsersController
);

router.get(
  "/messages",
  authValidate(validateAuthorization),
  validateParam(validateParamMessages),
  messagesController
);

export default router;

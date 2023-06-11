import { Request, Response, Router } from "express";
import validate from "../../middlewares/validate";
import { sendChat } from "./service.chat";
import { validateChat, validateAuthorization } from "./model.chat";
import authValidate from "../../middlewares/authValidate";
const router = Router();

const sendChatController = async (req: Request, res: Response) => {
  try {
    const result = await sendChat(req.body,req.headers.authorization);
    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(err.status).json({ error: err.message, success: false });
  }
};

router.post(
  "/send",
  authValidate(validateAuthorization),
  validate(validateChat),
  sendChatController
);



export default router;

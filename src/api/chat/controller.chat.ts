import { Request, Response, Router } from "express";
import validate from "../../middlewares/validate";
import { uploadChat } from "./service.chat";
import { validateChat, validateChatHeader } from "./model.chat";
const router = Router();

const uploadChatController = async (req: Request, res: Response) => {
  try {
    const result = await uploadChat(req.body);
    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(err.status).json({ error: err.message, success: false });
  }
};

router.post(
  "/upload",
  [validate(validateChat), validate(validateChatHeader)],
  uploadChatController
);

export default router;

import { Router } from "express";
import validatePayLoad from "../../../middlewares/chatValid";
import { uploadChat } from "../service/uploadChat";
import { validateChat } from "../model/validate";
const router = Router();

router.post("/upload", validatePayLoad(validateChat), uploadChat);

export default router;

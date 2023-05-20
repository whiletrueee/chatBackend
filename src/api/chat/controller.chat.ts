import { Router } from "express";
import validatePayLoad from "../../middlewares/chatValid";
import { uploadChat } from "./service.chat";
import { validateChat } from "./validate.chat";
const router = Router();

router.post("/upload", validatePayLoad(validateChat), uploadChat);


export default router;

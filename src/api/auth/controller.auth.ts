import { Request, Response, Router } from "express";
import validatePayLoad from "../../middlewares/chatValid";
import { validateUserLogin, validateUserRegister } from "./model.auth";
import { login, register } from "./service.auth";
const router = Router();

const registerController = async (req: Request, res: Response) => {
  try {
    const result = await register(req.body);
    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(500).json({ error: err.message, success: false });
  }
};

const loginController = async (req: Request, res: Response) => {
  try {
    const result = await login(req.body);
    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(500).json({ error: err.message, success: false });
  }
};

router.post(
  "/register",
  validatePayLoad(validateUserRegister),
  registerController
);
router.post("/login", validatePayLoad(validateUserLogin), loginController);

export default router;

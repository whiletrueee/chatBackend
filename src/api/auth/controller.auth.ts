import { Request, Response, Router } from "express";
import validate from "../../middlewares/validate";
import { validateUserLogin, validateUserRegister } from "./model.auth";
import { login, register } from "./service.auth";
const router = Router();

const registerController = async (req: Request, res: Response) => {
  try {
    const result = await register(req.body);
    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(err.status).json({ error: err.message, success: false });
  }
};

const loginController = async (req: Request, res: Response) => {
  try {
    const result = await login(req.body);
    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(err.status).json({ error: err.message, success: false });
  }
};

router.post("/register", validate(validateUserRegister), registerController);
router.post("/login", validate(validateUserLogin), loginController);

export default router;

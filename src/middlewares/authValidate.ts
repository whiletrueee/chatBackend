import { NextFunction, Request, Response } from "express";

const authLoginValidate = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({ authorization: req.headers.authorization });
      next();
    } catch (err: any) {
      return res
        .status(400)
        .json({ errorType: err.name, error: err.issues, success: false });
    }
  };
};

export default authLoginValidate;

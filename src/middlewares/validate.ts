import { NextFunction, Request, Response } from "express";

const validate = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const chat = req.body;
    try {
      schema.parse(chat);
      next();
    } catch (err: any) {
      return res
        .status(400)
        .json({ errorType: err.name, error: err.issues, success: false });
    }
  };
};

export default validate;

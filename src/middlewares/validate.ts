import { NextFunction, Request, Response } from "express";

const validate = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const chat = req.body;
    try {
      schema.parse(chat);
      next();
    } catch (err) {
      console.log("This is zod err");
      next(err);
    }
  };
};

export default validate;

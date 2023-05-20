import { NextFunction, Request, Response } from "express";

const validatePayLoad = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const chat = req.body;
    try {
      schema.parse(chat);
      next();
    } catch (err) {
      console.log("This is zod err",err);
      res.status(400).send({ message: "Invalid chat data" });
      return;
    }
  };
};

export default validatePayLoad;

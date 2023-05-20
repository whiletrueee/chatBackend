import { NextFunction, Request, Response } from "express";

const authLoginValidate = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({ authorization: req.headers.authorization });
      const { authorization } = req.headers;
      if (!authorization) throw new Error("Authorization header is required");

      next();
    } catch (err: any) {
      console.log("This is authLoginValidate zod err");
      return res
        .status(400)
        .json({ error: "Invalid header provided", success: false });
    }
  };
};

export default authLoginValidate;

import { z } from "zod";

const email = z.string().email();
const password = z.string().min(6);
const name = z.string().min(1);

export const validateUserRegister = z.object({
  email,
  name,
  password,
});

export type validateUserRegisterType = z.TypeOf<typeof validateUserRegister>;

export type finalUserRegisterType = validateUserRegisterType & {
  createdAt: Date;
  updatedAt: Date;
  userId: string
};

export const validateUserLogin = z.object({
  email,
  password: z.string().min(6),
});

export type validateUserLoginType = z.TypeOf<typeof validateUserLogin>;

export const wrongPassword = {
  message: "Password is incorrect",
  status: 401,
  success: false,
};

export const wrongMail = {
  message: "E-Mail / user Id is incorrect",
  status: 401,
  success: false,
};

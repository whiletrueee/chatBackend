import { z } from "zod";

const email = z.string().email();
const password = z.string().min(6);
const name = z.string().min(1);
const userId = z.string().min(5);
const mailORuserId = z.union([email, userId]);

export const validateUserRegister = z.object({
  email,
  name,
  password,
});

export type validateUserRegisterType = z.TypeOf<typeof validateUserRegister>;

export type finalUserRegisterType = validateUserRegisterType & {
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export const validateUserLogin = z.object({
  mailORuserId,
  password: z.string().min(6),
});

export type validateUserLoginType = z.TypeOf<typeof validateUserLogin>;

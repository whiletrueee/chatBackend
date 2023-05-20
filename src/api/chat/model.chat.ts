import { z } from "zod";

export const validateChat = z.object({
  message: z.string().min(1),
  from: z.string().min(4),
  to: z.string().min(4),
});

export const validateAuthorization = z.object({
  authorization: z.string().min(1),
});

export type validateChatType = z.TypeOf<typeof validateChat>;

export type finalChatType = validateChatType & {
  createdAt: Date;
};

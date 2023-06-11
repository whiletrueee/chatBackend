import { type } from "os";
import { z } from "zod";

export const validateChat = z.object({
  message: z.string().min(1),
  from: z.string(),
  to: z.string(),
  sentAt: z.string()
});

export const validateAuthorization = z.object({
  authorization: z.string().min(1),
});

export type chatSendHeader = z.TypeOf<typeof validateAuthorization>;
export type validateChatType = z.TypeOf<typeof validateChat>;

export type finalChatType = validateChatType & {
  createdAt: Date;
};

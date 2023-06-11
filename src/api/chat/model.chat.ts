import { type } from "os";
import { z } from "zod";

export const validateSendChat = z.object({
  message: z.string().min(1),
  from: z.string(),
  to: z.string(),
  sentAt: z.string(),
});

export const validateRecieveChat = z.object({
  from: z.string(),
  to: z.string(),
});

export const validateAuthorization = z.object({
  authorization: z.string().min(1),
});

export type chatSendHeader = z.TypeOf<typeof validateAuthorization>;
export type validateChatType = z.TypeOf<typeof validateSendChat>;

export type finalChatType = validateChatType & {
  createdAt: Date;
};


export interface ChatMessage {
  _id: string;
  message: string;
  from: string;
  to: string;
  sentAt: string;
  createdAt: string;
}
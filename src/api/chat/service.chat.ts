import { getDB } from "../../config/mongoDb";
import { finalChatType } from "./model.chat";

export const uploadChat = async (chatBody: finalChatType) => {
  const db = await getDB();
  const ChatData = db.collection("ChatData");
  chatBody.createdAt = new Date();
  const result = await ChatData.insertOne(chatBody);
  if (!result) {
    throw { message: "Chat not saved", status: 500, success: false };
  }
};

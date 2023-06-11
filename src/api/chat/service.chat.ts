import { getDB } from "../../config/mongoDb";
import { chatRecentBody, finalChatType } from "./model.chat";

export const sendChat = async (
  chatBody: finalChatType,
  token: string | undefined
) => {
  const users = (await getDB()).collection("users");
  const validateUser = await users.findOne(
    { userId: chatBody.from },
    { projection: { token: 1, _id: 0 } }
  );
  if (!validateUser) {
    throw { message: "invalid source of message", status: 403, success: false };
  }

  if (token === validateUser?.token) {
    const chatData = (await getDB()).collection("ChatData");
    chatBody.createdAt = new Date();
    const insertData = await chatData.insertOne(chatBody);
    return insertData;
  }

  throw { message: "Session Timed Out", status: 440, success: false };
};

export const recieveChat = async (
  chatBody: finalChatType,
  token: string | undefined
) => {
  const getDatabase = await getDB();
  const users = getDatabase.collection("users");
  const validateUser = await users.findOne(
    { userId: chatBody.to },
    { projection: { token: 1, _id: 0 } }
  );
  if (!validateUser) {
    throw { message: "Invalid source of request", status: 403, success: false };
  }

  if (token === validateUser?.token) {
    const chatData = getDatabase.collection("ChatData");
    const getAllMessages = await chatData.find({ to: chatBody.to }).toArray();
    if (getAllMessages) {
      const sortedOrder = getAllMessages.sort((a, b) => {
        const dateA = new Date(a.sentAt);
        const dateB = new Date(b.sentAt);
        return dateA.getTime() - dateB.getTime();
      });
      return sortedOrder;
    }
  }

  throw { message: "Session Timed Out", status: 440, success: false };
};

export const recentChat = async (
  chatBody: chatRecentBody,
  token: string | undefined
) => {
  const getDatabase = await getDB();
  const users = getDatabase.collection("users");
  const validateUser = await users.findOne(
    { userId: chatBody.userId },
    { projection: { token: 1, _id: 0 } }
  );
  if (!validateUser) {
    throw {
      message: "No user exist with provided userId",
      status: 403,
      success: false,
    };
  }

  if (token === validateUser?.token) {
    const chatData = getDatabase.collection("ChatData");
    const getRecentChats = await chatData
      .find({ $or: [{ from: chatBody.userId }, { to: chatBody.userId }] })
      .toArray();
    if (getRecentChats) {
      const sortedOrder = getRecentChats.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });

      return sortedOrder;
    }
  }

  throw { message: "Session Timed Out", status: 440, success: false };
};

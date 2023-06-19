import { useSocket } from "../..";
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
    
    useSocket.emit("send-message", chatBody);

    return {insertData, success: true, status: 200};
  }

  throw { message: "Session Timed Out", status: 440, success: false };
};

export const allUsers = async (userId: string, token: string | undefined) => {
  const getDatabase = await getDB();
  const users = getDatabase.collection("users");
  const validateUser = await users.findOne(
    { userId },
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
    const allUsers = await users
      .find({}, { projection: { name: 1, email: 1, userId: 1 } })
      .toArray();

    return allUsers.filter((user) => user.userId !== userId);
  }
  throw { message: "Session Timed Out", status: 440, success: false };
};

export const recieveChat = async (
  from: string,
  to: string,
  token: string | undefined
) => {
  const getDatabase = await getDB();
  const users = getDatabase.collection("users");
  const validateUser = await users.findOne(
    { userId: from },
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
      .find({
        $or: [
          { from: from, to: to },
          { from: to, to: from },
        ],
      })
      .toArray();
    if (getRecentChats) {
      const sortedOrder = getRecentChats.sort((a, b) => {
        const dateA = new Date(a.sentAt);
        const dateB = new Date(b.sentAt);
        return dateA.getTime() - dateB.getTime();
      });

      return sortedOrder;
    }
  }
  throw { message: "Session Timed Out", status: 440, success: false };
};

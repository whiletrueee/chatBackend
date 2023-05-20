import { Request, Response } from "express";
import { closeDB, getDB } from "../../config/mongoDb";
import { close } from "fs";

export const uploadChat = async (req: Request, res: Response) => {
  try {
    const db = await getDB();
    const ChatData = db.collection("ChatData");
    const chat = req.body;
    chat.createdAt = new Date();

    const result = await ChatData.insertOne(chat);
    if (!result) {
      throw { message: "Chat not saved", status: 500 };
    }
    return res.status(200).json({
      message: "Chat saved successfully",
      success: true,
      timeStamp: chat.createdAt,
    });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ error: err.message, success: false });
  }
};

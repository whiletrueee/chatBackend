import { Db, MongoClient } from "mongodb";

import { config } from "dotenv";

config();

let db: Db;
let client: MongoClient;

const initDatabase = async () => {
  const uri = process.env.MONGODB_URI!;
  const DB_Name = process.env.MONGODB_DB!;

  try {
    client = await MongoClient.connect(uri);
    db = client.db(DB_Name);
    console.log("Successfully connected to MongoDB !");

    return;
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
    process.exit();
  }
};

export const getDB = async () => {
  if (!db) {
    await initDatabase();
  }
  return db;
};

export const closeDB = () => {
  client.close();
};

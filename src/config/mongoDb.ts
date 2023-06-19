import { Db, MongoClient } from "mongodb";
import config from ".";

let db: Db;
let client: MongoClient;

const initDatabase = async () => {
  const uri = config.databaseURL!;
  const DB_Name = config.databaseName!;

  try {
    client = await MongoClient.connect(uri);
    db = client.db(DB_Name);

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

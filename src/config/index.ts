import { config } from "dotenv";

config();

export default {
  port: parseInt(process.env.PORT!) || 5050,

  databaseName: process.env.MONGODB_DB,

  databaseURL: process.env.MONGODB_URI,

  jwtSecret: process.env.JWT_SECRET,

  api: {
    prefix: "/api",
  },
};

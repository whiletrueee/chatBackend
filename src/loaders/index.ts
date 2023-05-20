import { getDB } from "../config/mongoDb";
import express from "./express";
import Express from "express";

export default async (expressApp: Express.Application): Promise<void> => {
  await getDB();
  console.log("✅ Database is connected ✅");

  express(expressApp);
  console.log("✅ Express is connected ✅");
};

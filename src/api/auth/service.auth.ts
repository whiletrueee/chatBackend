import config from "../../config";
import { getDB } from "../../config/mongoDb";
import {
  finalUserRegisterType,
  validateUserLoginType,
  wrongMail,
  wrongPassword,
} from "./model.auth";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export const register = async (body: finalUserRegisterType) => {
  const userData = body;
  const user = (await getDB()).collection("users");
  const getProfile = await user.findOne({ email: userData.email });
  // check if user already exists
  if (getProfile) {
    throw { message: "User already exists", status: 409, success: false };
  }
  userData.password = await bcrypt.hash(userData.password, 2);
  // create new user
  userData.createdAt = new Date();
  userData.updatedAt = new Date();
  userData.userId = crypto.randomBytes(16).toString("hex");
  // insert user
  const result = await user.insertOne(userData);
  if (!result) {
    throw { message: "User not Registered", status: 409, success: false };
  }
  // return success message
  return {
    status: 200,
    message: "User Registered successfully",
    success: true,
  };
};

export const login = async (body: validateUserLoginType) => {
  const users = (await getDB()).collection("users");
  const query = { email: body.email };
  const getProfile = await users.findOne(query);
  if (!getProfile) {
    throw { message: "User not found", status: 404, success: false };
  }
  const isPasswordValid = await bcrypt.compare(
    body.password,
    getProfile.password
  );
  if (!isPasswordValid) {
    throw wrongPassword;
  }

  const token = jwt.sign(
    { email: getProfile.email, userId: getProfile.userId },
    config.jwtSecret as string,
    { expiresIn: "10d" }
  );

  await users.updateOne(
    { email: getProfile.email },
    { $set: { token, updatedAt: new Date() } }
  );

  return {
    message: "Login successful",
    success: true,
    token,
    userId: getProfile.userId,
  };
};

export const getAllUsersList = async (body: validateUserLoginType) => {
  if (body.email === "admin@chatapp.com") {
    if (body.password === "231304") {
      const users = (await getDB()).collection("users");
      const getUsers = await users
        .find({}, { projection: { name: 1, email: 1, _id: 0 } })
        .toArray();
      return getUsers;
    } else {
      throw wrongPassword;
    }
  } else {
    throw wrongMail;
  }
};

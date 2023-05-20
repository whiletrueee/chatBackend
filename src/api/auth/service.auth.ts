import { getDB } from "../../config/mongoDb";
import { finalUserRegisterType, validateUserLoginType } from "./model.auth";
import bcrypt from "bcrypt";

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
  const count = await user.countDocuments();
  userData.userId = `user${count + 1}`;
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
  const user = (await getDB()).collection("users");
  const query = {
    $or: [{ email: body.mailORuserId }, { userId: body.mailORuserId }],
  };
  const getProfile = await user.findOne(query);
  if (!getProfile) {
    throw { message: "User not found", status: 404, success: false };
  }

  return { message: getProfile, status: 200, success: true };
};

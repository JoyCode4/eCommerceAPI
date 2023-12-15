import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
const UserModel = mongoose.model("User", userSchema);

export default class UserRepository {
  static async signUp(user) {
    try {
      const newUser = new UserModel(user);
      newUser.save();
      return newUser;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async signIn(email) {
    try {
      const user = await UserModel.findOne({ email });
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }
}

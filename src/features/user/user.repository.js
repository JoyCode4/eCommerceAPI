import { getDB } from "../../config/mongodb.js";

export default class UserRepository {
  static async signUp(newUser) {
    try {
      const db = getDB();
      const collection = db.collection("users");
      await collection.insertOne(newUser);
      return newUser;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async signIn(email, password) {
    try {
      const db = getDB();
      const collection = db.collection("users");
      return await collection.findOne({ email, password });
    } catch (err) {
      throw new Error(err);
    }
  }
}

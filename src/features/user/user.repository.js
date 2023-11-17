import { getDB } from "../../config/mongodb.js";

const collectionDB = "users";
export default class UserRepository {
  static async signUp(newUser) {
    try {
      const db = getDB();
      const collection = db.collection(collectionDB);
      await collection.insertOne(newUser);
      return newUser;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async signIn(email) {
    try {
      const db = getDB();
      const collection = db.collection(collectionDB);
      return await collection.findOne({ email });
    } catch (err) {
      throw new Error(err);
    }
  }
}

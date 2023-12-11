import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";

const collectionDB = "cartItems";
export default class CartRepository {
  static async add(productId, userId, quantity) {
    try {
      const db = getDB();
      const collection = db.collection(collectionDB);
      await collection.updateOne(
        {
          productId: new ObjectId(productId),
          userId: new ObjectId(userId),
        },
        {
          $inc: {
            quantity: quantity,
          },
        },
        { upsert: true }
      );
      // await collection.insertOne({
      //   productId: new ObjectId(productId),
      //   userId: new ObjectId(userId),
      //   quantity,
      // });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async get(userId) {
    try {
      const db = getDB();
      const collection = db.collection(collectionDB);
      const cartItems = await collection
        .find({ userId: new ObjectId(userId) })
        .toArray();
      return cartItems;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async delete(cartItemId, userId) {
    try {
      const db = getDB();
      const collection = db.collection(collectionDB);
      const status = await collection.deleteOne({
        _id: new ObjectId(cartItemId),
        userId: new ObjectId(userId),
      });
      return status.deletedCount > 0;
    } catch (err) {
      throw new Error(err);
    }
  }
}

import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";

const collectionDB = "products";
export default class ProductRepository {
  static async getAll() {
    try {
      const db = getDB();
      const collection = db.collection(collectionDB);
      const products = await collection.find({}).toArray();
      return products;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async get(id) {
    try {
      const db = getDB();
      const collection = db.collection(collectionDB);
      const product = await collection.findOne({ _id: new ObjectId(id) });
      return product;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async add(newProduct) {
    try {
      const db = getDB();
      const collection = db.collection(collectionDB);
      await collection.insertOne(newProduct);
      return newProduct;
    } catch (err) {
      throw new Error(err);
    }
  }
}

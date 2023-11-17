import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";

const collectionDBProduct = "products";
const collectionDBUser = "users";
export default class ProductRepository {
  static async getAll() {
    try {
      const db = getDB();
      const collection = db.collection(collectionDBProduct);
      const products = await collection.find({}).toArray();
      return products;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async get(id) {
    try {
      const db = getDB();
      const collection = db.collection(collectionDBProduct);
      const product = await collection.findOne({ _id: new ObjectId(id) });
      return product;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async add(newProduct) {
    try {
      const db = getDB();
      const collection = db.collection(collectionDBProduct);
      await collection.insertOne(newProduct);
      return newProduct;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async filter(minPrice, maxPrice, category) {
    try {
      const db = getDB();
      const collection = db.collection(collectionDBProduct);
      const filterExpression = {};
      if (minPrice) {
        filterExpression.price = { $gte: minPrice };
      }
      if (maxPrice) {
        filterExpression.price = { ...filterExpression.price, $lte: maxPrice };
      }
      if (category) {
        filterExpression.category = { category: category };
      }
      const result = await collection.find(filterExpression).toArray();
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async rate(userId, productId, rating) {
    try {
      const db = getDB();
      const collectionProduct = db.collection(collectionDBProduct);

      await collectionProduct.updateOne(
        {
          _id: new ObjectId(productId),
        },
        {
          $push: {
            rating: {
              userId,
              rating,
            },
          },
        }
      );
    } catch (err) {
      throw new Error(err);
    }
  }
}

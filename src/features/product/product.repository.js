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

  static async filter(minPrice, maxPrice, category) {
    try {
      const db = getDB();
      const collection = db.collection(collectionDB);
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
      const collectionProduct = db.collection(collectionDB);

      // const product = await collectionProduct.findOne({
      //   _id: new ObjectId(productId),
      // });
      // const userRating = product?.ratings?.find((r) => r.userId == userId);
      // if (userRating) {
      //   const status = await collectionProduct.updateOne(
      //     {
      //       _id: new ObjectId(productId),
      //       "ratings.userId": new ObjectId(userId),
      //     },
      //     {
      //       $set: {
      //         "ratings.$.rating": rating,
      //       },
      //     }
      //   );
      //   console.log(status);
      // } else {
      //   await collectionProduct.updateOne(
      //     {
      //       _id: new ObjectId(productId),
      //     },
      //     {
      //       $push: {
      //         ratings: {
      //           userId: new ObjectId(userId),
      //           rating,
      //         },
      //       },
      //     }
      //   );
      // }

      await collectionProduct.updateOne(
        {
          _id: new ObjectId(productId),
        },
        {
          $pull: {
            ratings: { userId: new ObjectId(userId) },
          },
        }
      );

      await collectionProduct.updateOne(
        {
          _id: new ObjectId(productId),
        },
        {
          $push: {
            ratings: { userId: new ObjectId(userId), rating },
          },
        }
      );
    } catch (err) {
      throw new Error(err);
    }
  }
  static async averageProductPricePerCategory() {
    try {
      const db = getDB();
      return await db
        .collection("products")
        .aggregate([
          {
            $group: {
              _id: "$category",
              averagePrice: { $avg: "$price" },
            },
          },
        ])
        .toArray();
    } catch (err) {
      throw new Error(err);
    }
  }
}

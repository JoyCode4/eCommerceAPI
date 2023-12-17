import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import mongoose from "mongoose";
import { productSchema } from "./product.schema.js";
import { reviewSchema } from "./review.schema.js";

const ProductModel = mongoose.model("Product", productSchema);
const ReviewModel = mongoose.model("Review", reviewSchema);

const collectionDB = "products";
export default class ProductRepository {
  static async getAll() {
    try {
      const products = await ProductModel.find();
      return products;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async get(id) {
    try {
      const product = await ProductModel.findById(id);
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
      const product = await ProductModel.findById(productId);
      if (!product) {
        throw new Error("Product not found.");
      }
      const review = await ReviewModel.findOne({
        product: new ObjectId(productId),
        user: new ObjectId(userId),
      });
      if (review) {
        review.rating = rating;
        await review.save();
      } else {
        const newReview = new ReviewModel({
          product: new ObjectId(productId),
          user: new ObjectId(userId),
          rating: rating,
        });
        await newReview.save();
      }
    } catch (err) {
      throw new Error(err);
    }
  }
  static async averageProductPricePerCategory() {
    try {
      const db = getDB();
      return await db
        .collection(collectionDB)
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

  static async averageRating() {
    try {
      const db = getDB();
      const result = await db
        .collection(collectionDB)
        .aggregate([
          {
            $unwind: "$ratings",
          },
          {
            $group: {
              _id: "$name",
              averageRating: {
                $avg: "$ratings.rating",
              },
            },
          },
        ])
        .toArray();

      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async countOfRating() {
    try {
      const db = getDB();
      const result = await db
        .collection(collectionDB)
        .aggregate([
          {
            $project: {
              name: 1,
              countOfRating: {
                $cond: {
                  if: { $isArray: "$ratings" },
                  then: { $size: "$ratings" },
                  else: 0,
                },
              },
            },
          },
          {
            $sort: {
              countOfRating: -1,
            },
          },
          {
            $limit: 1,
          },
        ])
        .toArray();

      return result;
    } catch (err) {
      throw new Error(err);
    }
  }
}

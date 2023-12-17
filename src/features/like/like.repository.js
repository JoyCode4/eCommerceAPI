import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";
import { ObjectId } from "mongodb";

const LikeModel = mongoose.model("Like", likeSchema);

export default class LikeRepository {
  static async likeProduct(userId, productId) {
    try {
      const newLike = new LikeModel({
        user: new ObjectId(userId),
        likeable: new ObjectId(productId),
        on_model: "Product",
      });
      await newLike.save();
    } catch (err) {
      throw new Error(err);
    }
  }

  static async likeCategory(userId, categoryId) {
    try {
      const newLike = new LikeModel({
        user: new ObjectId(userId),
        likeable: new ObjectId(categoryId),
        on_model: "Category",
      });
      await newLike.save();
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getLikes(type, id) {
    try {
      const likes = await LikeModel.find({
        likeable: new ObjectId(id),
        on_model: type,
      })
        .populate("user")
        .populate({
          path: "likeable",
          model: type,
        });
      return likes;
    } catch (err) {
      throw new Error(err);
    }
  }
}

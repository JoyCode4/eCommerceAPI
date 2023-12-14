import { ObjectId } from "mongodb";
import { getClient, getDB } from "../../config/mongodb.js";
import OrderModel from "./order.model.js";

const collectionDB = "orders";
export default class OrderRepository {
  static async placeOrder(userId) {
    const client = getClient();
    const session = client.startSession();
    try {
      const db = getDB();
      session.startTransaction();
      //Get cartItems and calculate total amount.
      const items = await this.getTotalAmount(userId, session);
      const finalTotalAmount = items.reduce(
        (acc, item) => acc + item.totalAmount,
        0
      );
      console.log(finalTotalAmount);

      // Create an order record.
      const newOrder = new OrderModel(
        new ObjectId(userId),
        finalTotalAmount,
        new Date()
      );

      await db.collection(collectionDB).insertOne(newOrder, { session });

      // Reduce the stock.
      for (let item of items) {
        await db.collection("products").updateOne(
          {
            _id: item.productId,
          },
          {
            $inc: { stocks: -item.quantity },
          },
          { session }
        );
      }

      // throw new Error("Something is doing wrong..");
      // Clear the cart items.
      await db.collection("cartItems").deleteMany(
        {
          userId: new ObjectId(userId),
        },
        { session }
      );
      await session.commitTransaction();
      session.endSession();
      return;
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw new Error(err);
    }
  }

  static async getTotalAmount(userId, session) {
    try {
      const db = getDB();
      const items = await db
        .collection("cartItems")
        .aggregate(
          [
            {
              $match: {
                userId: new ObjectId(userId),
              },
            },
            {
              $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "productInfo",
              },
            },
            {
              $unwind: "$productInfo",
            },
            {
              $addFields: {
                totalAmount: {
                  $multiply: ["$productInfo.price", "$quantity"],
                },
              },
            },
          ],
          { session }
        )
        .toArray();
      return items;
    } catch (err) {
      throw new Error(err);
    }
  }
}

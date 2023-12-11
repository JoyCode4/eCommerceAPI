import { MongoClient } from "mongodb";

let client;
const connectToMongoDB = () => {
  const url = process.env.DB_URL;
  MongoClient.connect(url)
    .then((clientInstance) => {
      client = clientInstance;
      console.log("MongoDB is Connected Successfully");
      createCounter(client.db());
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB: " + error.message);
    });
};

export const getDB = () => {
  return client.db();
};

const createCounter = async (db) => {
  const existingCounter = await db
    .collection("counters")
    .findOne({ _id: "cartItemId" });
  if (!existingCounter) {
    await db.collection("counters").insertOne({ _id: "cartItemId", value: 0 });
  }
};

export default connectToMongoDB;

import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017/eCommerceDB";
let client;
const connectToMongoDB = () => {
  MongoClient.connect(url)
    .then((clientInstance) => {
      client = clientInstance;
      console.log("MongoDB is Connected Successfully");
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB: " + error.message);
    });
};

export const getDB = () => {
  return client.db();
};

export default connectToMongoDB;

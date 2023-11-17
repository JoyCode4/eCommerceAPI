import { MongoClient } from "mongodb";

let client;
const connectToMongoDB = () => {
  const url = process.env.DB_URL;
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

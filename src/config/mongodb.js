import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017/eCommerceDB";

const connectToMongoDB = () => {
  MongoClient.connect(url)
    .then((client) => {
      console.log("MongoDB is Connected Successfully");
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB: " + error.message);
    });
};

export default connectToMongoDB;

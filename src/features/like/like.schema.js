import mongoose from "mongoose";

export const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likeable: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "on_model",
  },
  on_model: {
    type: String,
    enum: ["Product", "Category"],
  },
})
  // Document Middleware : Pre middleware of mongoose before save the doc
  .pre("save", (next) => {
    console.log("Document Saving is ongoing...");
    next();
  })
  // Document Middleware : Post middleware of mongoose after save the doc
  .post("save", (docs) => {
    console.log("Document is saved...");
    console.log(docs);
  })
  // Query Middleware : Pre middleware of mongoose before find function of mongoose
  .pre("find", (next) => {
    console.log("finding ...");
    next();
  })
  // Query Middleware : Post middleware of mongoose after find function of mongoose
  .post("find", (docs) => {
    console.log("docs is been found...");
    console.log(docs);
  });

import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
  },
  sizes: [
    {
      type: String,
    },
  ],
  inStock: {
    type: Number,
  },
});

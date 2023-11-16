import ApplicationError from "../../errorHandler/applicationError.js";
import UserModel from "../user/user.model.js";

export default class ProductModel {
  constructor(id, name, desc, price, imageUrl, category, sizes) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.imageUrl = imageUrl;
    this.category = category;
    this.price = price;
    this.sizes = sizes;
  }

  static getAll() {
    return products;
  }

  static get(id) {
    const product = products.find((p) => p.id == id);
    return product;
  }

  static add(newProduct) {
    newProduct.id = products.length + 1;
    products.push(newProduct);
    return newProduct;
  }

  static filter(minPrice, maxPrice, category) {
    const result = products.filter((product) => {
      return (
        (!minPrice || product.price >= minPrice) &&
        (!maxPrice || product.price <= maxPrice) &&
        (!category || product.category == category)
      );
    });

    return result;
  }

  static rate(userId, productId, rating) {
    const user = UserModel.getAll().find((u) => u.id == userId);
    if (!user) {
      // user-defined error
      throw new ApplicationError("User not found", 404);
    }

    const product = products.find((p) => p.id == productId);
    if (!product) {
      // user-defined error
      throw new ApplicationError("Product not found", 404);
    }

    if (!product.ratings) {
      product.ratings = [];
      product.ratings.push({ userId: userId, rating: rating });
    } else {
      const index = product.ratings.findIndex((r) => r.userId == userId);
      if (index <= -1) {
        product.ratings.push({ userId: userId, rating: rating });
      } else {
        product.ratings[index] = { userId: userId, rating: rating };
      }
    }
  }
}

var products = [
  new ProductModel(
    1,
    "Product 1",
    "Description for Product 1",
    19.99,
    "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg",
    "Cateogory1"
  ),
  new ProductModel(
    2,
    "Product 2",
    "Description for Product 2",
    29.99,
    "https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg",
    "Cateogory2",
    ["M", "XL"]
  ),
  new ProductModel(
    3,
    "Product 3",
    "Description for Product 3",
    39.99,
    "https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg",
    "Cateogory3",
    ["M", "XL", "S"]
  ),
];

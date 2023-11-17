import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController {
  async getAllProducts(req, res) {
    const products = await ProductRepository.getAll();
    res.status(200).send(products);
  }

  async addProduct(req, res) {
    try {
      const { name, desc, category, price, sizes } = req.body;
      console.log(req.file.filename);
      const newProduct = {
        name,
        desc,
        imageUrl: req.file.filename,
        category,
        price: parseFloat(price),
        sizes: sizes.split(","),
      };
      const createdProduct = await ProductRepository.add(newProduct);
      res.status(201).send({
        message: "Product added successfully",
        product: createdProduct,
      });
    } catch (err) {
      res.status(500).send("Something went Wrong!");
    }
  }

  async rateProduct(req, res) {
    try {
      const ratings = req.query.ratings;
      const userId = req.userId;
      const productId = req.query.productId;
      const err = await ProductRepository.rate(userId, productId, ratings);

      if (err) {
        return res.status(400).send(err);
      }
      return res.status(200).send("Done rating");
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something went Wrong!");
    }
  }

  async getOneProduct(req, res) {
    const id = req.params.id;
    const product = await ProductRepository.get(id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found...",
      });
    }
    res.status(200).send(product);
  }

  async filterProducts(req, res) {
    try {
      const minPrice = parseFloat(req.query.minPrice);
      const maxPrice = parseFloat(req.query.maxPrice);
      const category = req.query.category;
      const result = await ProductRepository.filter(
        minPrice,
        maxPrice,
        category
      );
      return res.status(200).send(result);
    } catch (err) {
      return res.status(500).send("Something went Wrong!");
    }
  }
}

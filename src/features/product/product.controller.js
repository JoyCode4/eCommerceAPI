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

  rateProduct(req, res) {
    const ratings = req.query.ratings;
    const userId = req.query.userId;
    const productId = req.query.productId;

    const err = ProductModel.rate(userId, productId, ratings);

    if (err) {
      return res.status(400).send(err);
    }
    res.status(200).send("Done rating");
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

  filterProducts(req, res) {
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const category = req.query.category;

    const result = ProductModel.filter(minPrice, maxPrice, category);
    res.status(200).json(result);
  }
}

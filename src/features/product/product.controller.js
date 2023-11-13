import ProductModel from "./product.model.js";

export default class ProductController {
  getAllProducts(req, res) {
    const products = ProductModel.getAll();
    res.status(200).send(products);
  }

  addProduct(req, res) {
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
    const createdProduct = ProductModel.add(newProduct);
    res.status(201).json({
      message: "Product added successfully",
      product: createdProduct,
    });
  }

  rateProduct(req, res) {}

  getOneProduct(req, res) {
    const id = req.params.id;
    const product = ProductModel.get(id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found...",
      });
    }
    res.status(200).json({
      product,
    });
  }

  filterProducts(req, res) {
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const category = req.query.category;

    const result = ProductModel.filter(minPrice, maxPrice, category);
    res.status(200).json(result);
  }
}

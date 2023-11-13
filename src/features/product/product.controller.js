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
    res.status(200).json({
      message: "Product added successfully",
      product: createdProduct,
    });
  }

  rateProduct(req, res) {}

  getOneProduct(req, res) {}
}

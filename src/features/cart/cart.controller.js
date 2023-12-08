import CartModel from "./cart.model.js";
import CartRepository from "./cart.repository.js";

export default class CartController {
  async add(req, res) {
    const { productId, quantity } = req.body;
    const userId = req.userId;
    await CartRepository.add(productId, userId, quantity);
    res.status(201).send("Cart is updated");
  }

  async get(req, res) {
    try {
      const userId = req.userId;
      const cartItems = await CartRepository.get(userId);
      return res.status(200).send({ cartItems });
    } catch (err) {
      return res.status(500).send("Something went Wrong");
    }
  }

  async delete(req, res) {
    try {
      const userId = req.userId;
      const cartId = req.params.id;
      const isDeleted = await CartRepository.delete(cartId, userId);
      if (!isDeleted) {
        return res.status(404).send("Cart Not Deleted");
      } else {
        return res
          .status(200)
          .send({ msg: "Cart Item is removed successfully" });
      }
    } catch (err) {
      return res.status(404).send("Something went Wrong");
    }
  }
}

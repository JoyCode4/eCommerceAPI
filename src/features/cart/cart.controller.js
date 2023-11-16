import CartModel from "./cart.model.js";

export default class CartController {
  add(req, res) {
    const { productId, quantity } = req.query;
    const userId = req.userId;
    const cartItem = CartModel.add(
      parseFloat(productId),
      userId,
      parseFloat(quantity)
    );
    res.status(201).send({ msg: "Cart is updated", cartItem });
  }

  get(req, res) {
    const userId = req.userId;
    const cartItems = CartModel.get(userId);
    return res.status(200).send({ cartItems });
  }

  delete(req, res) {
    const userId = req.userId;
    const cartId = req.params.id;
    const err = CartModel.delete(cartId, userId);
    if (err) {
      return res.status(404).send({ err });
    }
    return res.status(200).send({ msg: "Cart Item is removed successfully" });
  }
}

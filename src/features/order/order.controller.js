import OrderRepository from "./order.repository.js";

export default class OrderController {
  async placeOrder(req, res) {
    try {
      const userId = req.userId;
      await OrderRepository.placeOrder(userId);
      return res.status(200).send("Order is been created successfully");
    } catch (err) {
      return res.status(500).send("Something went wrong!" + err);
    }
  }
}

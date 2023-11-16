export default class CartModel {
  constructor(id, productId, userId, quantity) {
    this.id = id;
    this.productId = productId;
    this.userId = userId;
    this.quantity = quantity;
  }

  static add(productId, userId, quantity) {
    const userCartItems = this.get(userId);
    const index = userCartItems.findIndex(
      (i) => i.productId == productId && i.userId == userId
    );
    if (index == -1) {
      const id = cartItems.length + 1;
      const cartItem = new CartModel(id, productId, userId, quantity);
      cartItems.push(cartItem);
      return cartItem;
    }
    userCartItems[index].quantity = quantity;
    return userCartItems[index];
  }

  static get(userId) {
    return cartItems.filter((c) => c.userId == userId);
  }

  static delete(cartId, userId) {
    const index = cartItems.findIndex(
      (i) => i.id == cartId && i.userId == userId
    );
    if (index == -1) {
      return "CartItem not found";
    } else {
      cartItems.splice(index, 1);
    }
  }
}

const cartItems = [new CartModel(1, 1, 1, 2), new CartModel(2, 1, 2, 3)];

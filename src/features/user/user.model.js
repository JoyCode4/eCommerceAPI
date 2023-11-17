import { getDB } from "../../config/mongodb.js";

export default class UserModel {
  constructor(name, email, password, type, id) {
    this._id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
  }

  static async signUp(name, email, password, type) {
    try {
      const db = getDB();
      const collection = db.collection("users");
      const newUser = new UserModel(name, email, password, type);
      await collection.insertOne(newUser);
      return newUser;
    } catch (err) {
      console.error(err);
    }
  }

  static signIn(email, password) {
    const user = users.find((u) => u.email == email && u.password == password);

    if (!user) {
      return null;
    }
    return user;
  }

  static getAll() {
    return users;
  }
}

const users = [
  {
    id: 1,
    name: "John",
    email: "john@example.com",
    password: "password1",
    type: "seller",
  },
];

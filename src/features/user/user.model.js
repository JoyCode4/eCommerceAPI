import { getDB } from "../../config/mongodb.js";

export default class UserModel {
  constructor(name, email, password, type, id) {
    this._id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
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

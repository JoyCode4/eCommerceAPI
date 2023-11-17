import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";

export default class UserController {
  async signUp(req, res) {
    const { name, email, password, type } = req.body;
    const user = await UserModel.signUp(name, email, password, type);
    res.status(201).send({ user, message: "User is created successfully" });
  }

  signIn(req, res) {
    const { email, password } = req.body;
    const user = UserModel.signIn(email, password);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User does not exist / Incorrect Credentials" });
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      "eCommerce",
      {
        expiresIn: "2h",
      }
    );
    res.status(200).json({ token });
  }

  get(req, res) {
    const users = UserModel.getAll();
    res.status(200).json(users);
  }
}

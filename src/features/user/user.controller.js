import UserModel from "./user.model.js";
import UserRepository from "./user.repository.js";
import jwt from "jsonwebtoken";

export default class UserController {
  async signUp(req, res) {
    try {
      const { name, email, password, type } = req.body;
      const user = new UserModel(name, email, password, type);
      await UserRepository.signUp(user);
      return res
        .status(201)
        .send({ user, message: "User is created successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something Went wrong");
    }
  }

  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserRepository.signIn(email, password);
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
      return res.status(200).json({ token });
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something Went wrong");
    }
  }

  get(req, res) {
    const users = UserModel.getAll();
    res.status(200).json(users);
  }
}

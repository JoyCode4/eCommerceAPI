import UserModel from "./user.model.js";

export default class UserController {
  signUp(req, res) {
    const { name, email, password, type } = req.body;
    const user = UserModel.signUp(name, email, password, type);
    res.status(201).json({ user, message: "User is created successfully" });
  }

  signIn(req, res) {
    const { email, password } = req.body;
    const user = UserModel.signIn(email, password);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User does not exist / Incorrect Credentials" });
    }
    res.status(200).json({ user, message: "User is Login Successfully" });
  }

  get(req, res) {
    const users = UserModel.getAll();
    res.status(200).json(users);
  }
}

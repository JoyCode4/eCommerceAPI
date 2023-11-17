import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "./user.model.js";
import UserRepository from "./user.repository.js";

export default class UserController {
  async signUp(req, res) {
    try {
      const { name, email, password, type } = req.body;
      const hashedPassword = bcrypt.hashSync(password, 12);
      const user = new UserModel(name, email, hashedPassword, type);
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
      const user = await UserRepository.signIn(email);
      if (!user) {
        return res
          .status(401)
          .json({ message: "User does not exist / Incorrect Credentials" });
      } else {
        const result = await bcrypt.compare(password, user.password);
        if (result) {
          const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            {
              expiresIn: "2h",
            }
          );
          return res.status(200).json({ token });
        }
        return res
          .status(401)
          .json({ message: "User does not exist / Incorrect Credentials" });
      }
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

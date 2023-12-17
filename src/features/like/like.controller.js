import LikeRepository from "./like.repository.js";

export default class LikeController {
  async likeItems(req, res) {
    try {
      const { id, type } = req.body;
      if (type != "Product" && type != "Category") {
        return res.status(400).send("Invalid");
      } else {
        if (type == "Product") {
          await LikeRepository.likeProduct(req.userId, id);
        } else {
          await LikeRepository.likeCategory(req.userId, id);
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went Wrong!");
    }
  }
}

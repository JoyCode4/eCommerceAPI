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
      return res.status(201).send("Like is been done!");
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went Wrong!");
    }
  }

  async getLikes(req, res) {
    try {
      const { id, type } = req.query;
      const likes = await LikeRepository.getLikes(type, id);
      return res.status(200).send(likes);
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went Wrong!");
    }
  }
}

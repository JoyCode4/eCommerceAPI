import jwt from "jsonwebtoken";
const jwtAuth = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send("Unauthorized Access");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
  } catch (e) {
    if (e) {
      return res.status(401).send("Unauthorized Access");
    }
  }
  next();
};

export default jwtAuth;

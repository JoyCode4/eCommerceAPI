import UserModel from "../features/user/user.model.js";
const basicAuth = (req, res, next) => {
  const headerAuth = req.headers["authorization"];
  if (!headerAuth) {
    return res.status(403).send("Auth Header is not found");
  }

  const base64 = headerAuth.replace("Basic ", "");
  const decodeCred = Buffer.from(base64, "base64").toString("utf-8");
  const cred = decodeCred.split(":");
  console.log(cred);
  const user = UserModel.getAll().find(
    (u) => u.email == cred[0] && u.password == cred[1]
  );
  console.log(user);
  if (!user) {
    return res.status(404).send("incorrect Credentials");
  }
  next();
};

export default basicAuth;

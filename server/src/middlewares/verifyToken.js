import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      err: 1,
      msg: 'No token provided'
    });
  }

  let accessToken = token.split(" ")[1];
  if (!accessToken)
    return res.status(401).json({
      err: 1,
      msg: "Missing access token",
    });

  jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
    if (err)
      return res.status(401).json({
        err: 1,
        msg: "Access token expired",
      });

    req.user = user;
    next();
  });
};

export default verifyToken;

const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  const token = req.header("auth");

  if (!token) {
    return res.status(401).json({ msg: "Token not found." });
  }
  try {
    await jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        res.status(401).json({ msg: "Token is not valid" });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

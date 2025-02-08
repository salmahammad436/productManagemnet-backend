const jwt = require("jsonwebtoken");

const authorize = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(403)
        .json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = { authorize };

const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    //för att hitta token och använda sif av den för att kogga in
  const authorization = req.headers.authorization; // Bearer 9h1we912j3e
  const token = authorization?.split(" ")[1]; // 9h1we912j3e

  if (!token) {
    res.status(401).send("No token");
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;

    next();
  } catch (err) {
    res.status(401).send("Invalid token");
  }
};

module.exports = authMiddleware;

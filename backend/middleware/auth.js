// Middleware Imports
const jwt = require("jsonwebtoken");

// Middleware config.
module.exports = (req, res, next) => {
  try {
    console.log("oui");
    console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];
    console.log("oui");
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    if (req.body.userId && req.body.userId !== userId) {
      throw new Error("Non authorisé");
    } else {
      next();
    }
  } catch (e) {
    throw new Error("Non identifié");
  }
};

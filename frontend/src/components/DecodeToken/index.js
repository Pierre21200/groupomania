const jwt = require("jsonwebtoken");

const decodeToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const decodedToken = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
  if (!decodedToken.userId) {
    return null;
  }
  return true;
};

export default decodeToken;

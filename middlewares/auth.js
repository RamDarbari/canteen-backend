const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyToken = (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(401).json({message:"Unauthorized user"});
    }
  const token =
    req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(403).json({message:"A token is required for authentication."});
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.emp = decoded;

  } catch (err) {
    return res.status(401).json({message:err});
  }
  return next();
};
module.exports = verifyToken;
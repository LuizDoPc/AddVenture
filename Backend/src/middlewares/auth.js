import User from "../models/User";
import jwtService from "../services/jwtService";

module.exports = async (req, res, next) => {
  let token;
  token = req.query.token;
  if(!token) token = req.body.token;
  try {
    const response = jwtService.verify(token);

    next();
  } catch (error) {
    return res.status(403).json({
      error: "Unauthorized"
    });
  }
};

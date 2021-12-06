const { CustomErrorHandler, JwtService } = require("../services");

const auth = async (req, res, next) => {
  let authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(CustomErrorHandler.unAuthorized());
  }
  const token = authHeader.split(" ")[1];
  try {
    const { _id, role } = JwtService.varify(token);
    req.user = { _id, role };
    return next();
  } catch (error) {
    return next(CustomErrorHandler.unAuthorized());
  }
};
module.exports = auth;

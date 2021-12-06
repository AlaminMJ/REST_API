const { User } = require("../models");
const { CustomErrorHandler } = require("../services");
const userController = {
  async me(req, res, next) {
    try {
      const user = await User.findById(req.user._id).select(
        "-password -__v -updatedAt -createdAt"
      );
      if (!user) {
        return next(CustomErrorHandler.notFound());
      }
      res.json(user);
    } catch (error) {
      return next(error);
    }
  },
};
module.exports = userController;

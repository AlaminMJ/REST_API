const Joi = require("joi");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const { CustomErrorHandler, JwtService } = require("../services");

const loginController = {
  async login(req, res, next) {
    // validation
    const loginSchema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });
    const { err } = loginSchema.validate(req.body);
    if (err) {
      return next(err);
    }
    let result;
    try {
      result = await User.findOne({ email: req.body.email });
      if (!result) {
        return next(CustomErrorHandler.invalid());
      }
    } catch (error) {
      next(error);
    }

    const ismatch = bcrypt.compare(req.body.password, result.password);
    if (!ismatch) {
      return next(CustomErrorHandler.invalid());
    }
    const token = JwtService.sign({
      _id: result._id,
      email: result.email,
      role: result.role,
    });
    res.json({ token });
  },
};
module.exports = loginController;

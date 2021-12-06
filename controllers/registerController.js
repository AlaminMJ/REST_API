const Joi = require("joi");
const CustomErrorHandler = require("../services/CustomErrorHandler");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const JwtService = require("../services/JwtService");

const registerController = {
  async register(req, res, next) {
    // validation
    const registerSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().required(),
      password: Joi.string().min(6).required(),
      // confrimPassword: Joi.ref(password),
    });
    const { error } = registerSchema.validate(req.body);

    if (error) {
      return next(error);
    }
    // check if user is in the database already
    try {
      const exist = await User.exists({ email: req.body.email });
      if (exist) {
        return next(
          CustomErrorHandler.alreadyExist("This Email is already exist")
        );
      }
    } catch (error) {
      return next(error);
    }
    // hash password
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    let token;
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    try {
      const result = await user.save();
      // token
      token = JwtService.sign({
        _id: result._id,
        email: result.email,
        role: result.role,
      });
    } catch (error) {
      return next(error);
    }
    res.json({
      token,
      message: "Ok vai sob thik ",
    });
  },
};
module.exports = registerController;

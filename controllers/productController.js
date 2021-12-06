const Joi = require("joi");
const fs = require("fs");
const { HandelUplodeSinglefile, CustomErrorHandler } = require("../services");
const { Product } = require("../models");

const productController = {
  async store(req, res, next) {
    HandelUplodeSinglefile(req, res, async (err) => {
      if (err) {
        return next(CustomErrorHandler.serverError(err.message));
      }
      const filePath = req.file.path;

      // console.log("file", req.file);
      const productSchema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        size: Joi.string().required(),
      });
      const { error } = productSchema.validate(req.body);
      if (error) {
        // delete file
        fs.unlink(`${appRoot}/${filePath}`, (err) => {
          if (err) {
            return next(CustomErrorHandler.serverError());
          }
        });
        return next(error);
      }
      const { name, price, size } = req.body;
      let result;
      try {
        result = await Product.create({
          name,
          price,
          size,
          image: filePath,
        });
        console.log(result);
      } catch (error) {
        return next(CustomErrorHandler.serverError());
      }

      res.json(result);
    });
  },
};
module.exports = productController;

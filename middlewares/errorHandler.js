const { DEBUG_MODE } = require("../config");
const { ValidationError } = require("joi");
const CustomErrorHandler = require("../services/CustomErrorHandler");
const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  console.log(DEBUG_MODE);
  let data = {
    message: "Internal Server Error",
    ...(DEBUG_MODE === "true" && { OriginalError: err.message }),
  };
  //  joi data validaton
  if (err instanceof ValidationError) {
    statusCode = 422;
    data = {
      message: err.message,
    };
  }
  //   custom error handel
  if (err instanceof CustomErrorHandler) {
    (statusCode = err.status),
      (data = {
        message: err.message,
      });
  }

  return res.status(statusCode).json(data);
};

module.exports = errorHandler;

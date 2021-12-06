class CustomErrorHandler extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
  static alreadyExist(message) {
    return new CustomErrorHandler(409, message);
  }
  static invalid(message = "email and password invalid") {
    return new CustomErrorHandler(401, message);
  }
  static unAuthorized(message = "unAuthorized") {
    return new CustomErrorHandler(401, message);
  }
  static serverError(message = "Internal Sever error") {
    return new CustomErrorHandler(500, message);
  }
  static notFound(message = "404 Not found") {
    return new CustomErrorHandler(404, message);
  }
}

module.exports = CustomErrorHandler;

const express = require("express");
const router = express.Router();

const {
  registerController,
  loginController,
  userController,
  productController,
} = require("../controllers");
const { auth } = require("../middlewares");
router.post("/register", registerController.register);
router.post("/login", loginController.login);
router.get("/me", auth, userController.me);
router.post("/products", productController.store);

module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("../controller/authController");
const { redirectIfAuthenticated } = require('../middleware/auth');
const { validateSignup, validateLogin } = require("../validator/authValidator");
const validate = require('../validator/validate');

router.get("/signup", redirectIfAuthenticated, controller.signup);
router.get("/login", redirectIfAuthenticated, controller.login);
router.get("/logout", controller.logout)

router.post("/signup", redirectIfAuthenticated, validateSignup, validate, controller.register);
router.post("/login", redirectIfAuthenticated, validateLogin, validate, controller.loginIn);

module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("../controller/authController");
const { redirectIfAuthenticated } = require('../middleware/auth');

router.get("/signup", redirectIfAuthenticated, controller.signup);
router.get("/login", redirectIfAuthenticated, controller.login);
router.get("/logout", controller.logout)

router.post("/signup", redirectIfAuthenticated, controller.register);
router.post("/login", redirectIfAuthenticated, controller.loginIn);

module.exports = router;

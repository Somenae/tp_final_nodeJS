const express = require("express");
const router = express.Router();
const controller = require("../controller/usersController");
const { isAuthenticated } = require('../middleware/auth')

router.get("/profile", isAuthenticated, controller.seeProfile);

router.put("/profile", isAuthenticated, controller.updateProfile);

module.exports = router;

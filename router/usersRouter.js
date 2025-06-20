const express = require("express");
const router = express.Router();
const controller = require("../controller/usersController");
const { isAuthenticated } = require('../middleware/auth');
const validate = require('../validator/validate');
const { validateBody } = require("../validator/usersValidator");

router.get("/profile", isAuthenticated, controller.seeProfile);

router.put("/profile", isAuthenticated, validateBody, validate, controller.updateProfile);

module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("../controller/registrationsController");
const { isAdmin, isAuthenticated, isMember } = require('../middleware/auth');
const { validateIdParam } = require("../validator/registrationsValidator");
const validate = require('../validator/validate');

router.get("/me", isAuthenticated, isMember, controller.myTrips);
router.get("/trip/:id", isAuthenticated, isAdmin, validateIdParam, validate, controller.seeRegistrations);

router.post("/:id", isAuthenticated, isMember, validateIdParam, validate, controller.register);
router.delete('/:id', isAuthenticated, isMember, validateIdParam, validate, controller.removeRegistration);

module.exports = router;

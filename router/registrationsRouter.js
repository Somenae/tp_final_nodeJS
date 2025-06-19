const express = require("express");
const router = express.Router();
const controller = require("../controller/registrationsController");
const { isAdmin, isAuthenticated, isMember } = require('../middleware/auth')

router.get("/me", isAuthenticated, isMember, controller.myTrips);
router.get("/trip/:id", isAuthenticated, isAdmin, controller.seeRegistrations);

router.post("/:id", isAuthenticated, isMember, controller.register);
router.delete('/:id', isAuthenticated, isMember, controller.removeRegistration);

module.exports = router;

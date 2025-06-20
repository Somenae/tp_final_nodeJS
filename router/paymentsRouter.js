const express = require("express");
const router = express.Router();
const controller = require("../controller/paymentsController");
const { isAdmin, isAuthenticated, isMember } = require('../middleware/auth');
const { validateIdParam } = require("../validator/paymentsValidator");
const validate = require('../validator/validate');

router.get("/me", isAuthenticated, isMember, controller.seePayments);
router.get("/trip/:id", isAdmin, validateIdParam, validate, controller.seeTripPayments);

router.post("/:id", isAuthenticated, isMember, validateIdParam, validate, controller.userPayment);

module.exports = router;
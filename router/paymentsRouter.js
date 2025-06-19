const express = require("express");
const router = express.Router();
const controller = require("../controller/paymentsController");
const { isAdmin, isAuthenticated, isMember } = require('../middleware/auth')

router.get("/me", isAuthenticated, isMember, controller.seePayments);
router.get("/trip/:id", isAdmin, controller.seeTripPayments);

router.post("/:id", isAuthenticated, isMember, controller.userPayment);

module.exports = router;
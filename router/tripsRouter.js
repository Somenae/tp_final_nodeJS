const express = require("express");
const router = express.Router();
const controller = require("../controller/tripsController");
const { isAdmin, isAuthenticated } = require('../middleware/auth')
const validate = require('../validator/validate');
const { validateBody, validateIdParam } = require("../validator/tripsValidator");

router.get("", controller.index);
router.get("/create", isAdmin, controller.create);
router.get("/edit/:id", isAdmin, controller.edit);
router.get("/:id", isAuthenticated, validateIdParam, validate, controller.seeOne)

router.post("/store", validateBody, validate, controller.store);
router.post("/update/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;

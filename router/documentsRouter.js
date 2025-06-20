const express = require("express");
const router = express.Router();
const controller = require("../controller/documentsController");
const { isAdmin, isAuthenticated, isMember } = require('../middleware/auth');
const { validateIdParam, validateSendBody } = require("../validator/documentsValidator");
const validate = require('../validator/validate');

router.get("/me", isAuthenticated, isMember, controller.myDocuments)
router.get("/:id", validateIdParam, validate, controller.requiredDocuments);
router.get("/add/:id", isAuthenticated, isAdmin, validateIdParam, validate, controller.addDocument);
router.get("/send/:id", isAuthenticated, isMember, validateIdParam, validate, controller.sendDocument);
router.get("/trip/:id", isAuthenticated, isAdmin, validateIdParam, validate, controller.receivedDocuments);

router.post("/add/:id", isAuthenticated, isAdmin, validateIdParam, validate, controller.storeRequiredDocument);
router.post("/:id", isAuthenticated, isMember, validateIdParam, validate, controller.storeDocument)

module.exports = router;
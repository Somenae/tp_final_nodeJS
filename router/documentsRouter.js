const express = require("express");
const router = express.Router();
const controller = require("../controller/documentsController");
const { isAdmin, isAuthenticated, isMember } = require('../middleware/auth')

router.get("/me", isAuthenticated, isMember, controller.myDocuments)
router.get("/:id", controller.requiredDocuments);
router.get("/add/:id", isAuthenticated, isAdmin, controller.addDocument);
router.get("/send/:id", isAuthenticated, isMember, controller.sendDocument);
router.get("/trip/:id", isAuthenticated, isAdmin, controller.receivedDocuments);

router.post("/add/:id", isAuthenticated, isAdmin, controller.storeRequiredDocument);
router.post("/:id", isAuthenticated, isMember, controller.storeDocument)

module.exports = router;
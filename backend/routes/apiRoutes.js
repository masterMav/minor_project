const express = require("express");
const apiController = require("../controller/apiController");
const router = express.Router();

//routes
router.post("/register", apiController.register);
router.post("/login", apiController.login);
router.post("/change-password", apiController.changePassword);
router.post("/send-email", apiController.sendEmail);
router.post("/updaterank", apiController.updateRank);
router.post("/assign", apiController.assign);
router.post("/getasg", apiController.getasg);
router.get("/ranklist", apiController.getRanklist);
router.get("/admindata", apiController.admindata);
module.exports = router;

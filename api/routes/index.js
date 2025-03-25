const express = require("express");
const router = express.Router();

const authRoute = require("../controllers/authController.js");
const taskRoute = require("../controllers/taskController.js");

router.use("/auth", authRoute);
router.use("/task", taskRoute);


module.exports = router;

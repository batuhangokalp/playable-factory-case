const express = require("express");
const router = express.Router();
const Task = require("../models/Task.js");
const {
  getModel,
  createModel,
  updateModel,
  deleteModel,
} = require("../helpers/commonControllers.js");

router.post("/", createModel(Task));

router.get("/", getModel(Task));

router.put("/:id", updateModel(Task));

router.delete("/:id", deleteModel(Task));

module.exports = router;

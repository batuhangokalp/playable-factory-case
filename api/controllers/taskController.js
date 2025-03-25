const express = require("express");
const router = express.Router();
const Task = require("../models/Task.js");
const {
  getModel,
  createModel,
  updateModel,
  deleteModel,
} = require("../helpers/commonControllers.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

router.post("/", authMiddleware, createModel(Task));

router.get("/", authMiddleware, getModel(Task));

router.put("/:id", authMiddleware, updateModel(Task));

router.delete("/:id", authMiddleware, deleteModel(Task));

module.exports = router;

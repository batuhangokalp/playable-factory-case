const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { body, validationResult } = require("express-validator");

// #region Register
router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username is required."),
    body("email").isEmail().withMessage("Invalid email format."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists." });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Server error!" });
    }
  }
);
// #endregion

// #region Login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email format."),
    body("password").notEmpty().withMessage("Password is required."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log("Validation Errors:", errors.array());
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
    
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: "Invalid email!" });
      }
    
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid password!" });
      }
    
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
    
      res.status(200).json({ token, user });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Server error!" });
    }
    
  }
);
// #endregion

module.exports = router;

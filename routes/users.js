const express = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");

const router = express.Router();

router.post(
  "/",
  [
    check("name", "Please add Name").not().isEmpty(),
    check("email", "Please include valid email").isEmail(),
    check(
      "password",
      "Please Enter a password with more than 6 characters"
    ).isLength({ min: 6 }),
  ],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }
      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          return res.json({ token });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: "Server Error" });
    }
  }
);

router.get("/", (req, res) => {
  res.send({ msg: "get all users" });
});

module.exports = router;

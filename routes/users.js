const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.send({ desc: "registering a user" });
});

router.get("/", (req, res) => {
  res.send({ msg: "get all users" });
});

module.exports = router;

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ desc: "get logged in" });
});

router.post("/", (req, res) => {
  res.send({ desc: "log in" });
});

module.exports = router;

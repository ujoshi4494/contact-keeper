const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ contacts: [] });
});

router.post("/", (req, res) => {
  res.send({ msg: "conatact added" });
});

router.put("/:id", (req, res) => {
  res.send({ msg: "conatact updated" });
});

router.delete("/:id", (req, res) => {
  res.send({ msg: "contact deleted" });
});

module.exports = router;

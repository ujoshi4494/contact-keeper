const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const User = require("../models/User");
const Contact = require("../models/Contact");
const { check, validationResult } = require("express-validator");

router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id });
    res.send(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.post(
  "/",
  [auth, [check("name", "Please include Name").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();
      return res.send(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ msg: "Server Error" });
    }
  }
);

router.put("/:id", auth, async (req, res) => {
  try {
    const { name, email, phone, type } = req.body;

    let contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ msg: "Not Found" });
    }

    // make sure users own contacts

    if (contact.user.toString() !== req.user.id) {
      return res.status(400).json({ msg: "Unauthorized to update!" });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $set: contactFields,
      },
      { new: true }
    );
    res.send(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: "Server Error" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact)
      return res.status(404).send({ msg: "Unauthorized to delete!" });

    if (contact.user.toString() !== req.user.id) {
      return res.status(400).json({ msg: "Unauthorized to update!" });
    }

    await Contact.findByIdAndRemove(req.params.id);
    res.send("Contact removed!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: "Server Error" });
  }
});

module.exports = router;

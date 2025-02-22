const express = require("express");
const mongoose = require("mongoose");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");
const authRole = require("../middleware/authRole");

router.post("/api/user", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/api/user', auth, authRole(['admin']), async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});


router.post("/api/user/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.post("/api/user/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/api/user", auth, authRole(["admin", "companyUser"]), async (req, res) => {
    try {
      const query = {};
      // lisätään hakukriteerit kyselyparametreista
      if (req.query.email) {
        query.email = req.query.email; // Hakee käyttäjän sähköpostin perusteella
      }
      if (req.query.firstName) {
        query.firstName = { $regex: req.query.firstName, $options: "i" }; // Case-insensitive haku
      }
      if (req.query.lastName) {
        query.lastName = { $regex: req.query.lastName, $options: "i" }; // Case-insensitive haku
      }

      if (req.user.role === "companyUser") {
        query.company = req.user.company; // Lisää yrityssuodatus
        const users = await User.find(query);
        return res.send(users);
      }
      const users = await User.find(query);
      res.send(users);
    } catch (e) {
      console.log("Error fetching users", e.message);
      res.status(500).send({ error: e.message });
    }
  }
);

router.get(
  "/api/user/:id",
  auth,
  authRole(["admin", "companyUser"]),
  async (req, res) => {
    const _id = req.params.id;
    try {
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).send({ error: "Invalid ID format" });
      }
      if (req.user.role === "companyUser") {
        const user = await User.findOne({ _id, company: req.user.company });
        if (!user) {
          return res.status(404).send();
        }
        return res.send(user);
      }

      const user = await User.findById(_id);
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);

router.patch("/api/user/:id", auth, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send({ error: "Invalid ID format" });
  }
  if (req.user.role !== "admin" && req.user._id.toString() !== req.params.id) {
    return res.status(403).send({ error: "Forbidden" });
  }
  const allowedUpdates = Object.keys(User.schema.paths).filter(
    (path) =>
      path !== "__v" &&
      path !== "_id" &&
      path !== "createdAt" &&
      path !== "updatedAt" &&
      path !== "tokens"
  );
  const isValidOperation = Object.keys(req.body).every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.delete("/api/user/:id", auth, authRole(["admin"]), async (req, res) => {
  const _id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).send({ error: "Invalid ID format" });
    }

    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;

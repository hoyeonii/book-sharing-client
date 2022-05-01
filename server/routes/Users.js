const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");

const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, password, name, location } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
      name: name,
      location: location,
    });
    res.json("SUCCESS");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) {
    res.json({ error: "User Doesn't Exist" });
  } else {
    bcrypt.compare(password, user.password).then(async (match) => {
      try {
        if (!match)
          return res.json({ error: "Wrong Username And Password Combination" });

        const accessToken = sign(
          { username: user.username, id: user.id },
          "importantsecret"
        );

        res.json({ token: accessToken, username: username, id: user.id }); //pages/Login.js의 login function에 세 값을 넘겨줌
      } catch (error) {
        console.log(error);
      }
    });
  }
});
router.get("/login", async (req, res) => {
  const listOfUsers = await Users.findAll();
  res.json(listOfUsers);
});
router.get("/basicinfo/:id", async (req, res) => {
  const id = req.params.id;
  const basicinfo = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  }); // 비밀번호는 빼고 다 select
  res.json(basicinfo);
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

router.put("/byUserId/:id", async (req, res) => {
  const id = req.params.id;
  await Users.update(
    { name: req.body.name, location: req.body.location },
    { where: { id: id } }
  );
});
router.put("/changeName/:id", async (req, res) => {
  const id = req.params.id;
  await Users.update({ name: req.body.name }, { where: { id: id } });
});

module.exports = router;

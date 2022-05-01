const express = require("express");
const router = express.Router();
const { Message } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/:user", async (req, res) => {
  const user = req.params.user;
  const sent = await Message.findAll({
    where: { send: user },
  }); //find by primary key
  const received = await Message.findAll({
    where: { receive: user },
  }); //find by primary key
  concated = sent.concat(received).sort((a, b) => a.createdAt - b.createdAt);
  res.json(concated);
});
// router.get("chatroom/:user", async (req, res) => {
//   const user = req.params.user;
//   const sent = await Message.findAll({
//     where: { send: user },
//   }); //find by primary key
//   const received = await Message.findAll({
//     where: { receive: user },
//   }); //find by primary key
//   concated = sent.concat(received);
//   res.json(concated);
// });

// //데이터 업데이트 하는 방법
// router.put("/byId/:id", async (req, res) => {
//   const id = req.params.id;
//   await Message.update(
//     { available: req.body.available },
//     { where: { id: id } }
//   );
// });

router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  post.username = req.user.username;
  post.UserId = req.user.id;
  await Message.create(post);
  res.json(post);
});

router.delete("/:id", validateToken, async (req, res) => {
  const id = req.params.id;

  await Message.destroy({
    where: {
      id: id,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});

module.exports = router;

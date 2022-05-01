const express = require("express");
const router = express.Router();
// const { Posts, Likes } = require("../models");
const { Follow } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/byfollowedId/:id", async (req, res) => {
  const id = req.params.id;

  const listOfFollowingPPL = await Follow.findAll({ where: { followed: id } });
  res.json(listOfFollowingPPL);
});

router.get("/byfollowerId/:id", async (req, res) => {
  const id = req.params.id;

  const listOfFollowedPPL = await Follow.findAll({ where: { follower: id } }); //find by primary key
  res.json(listOfFollowedPPL);
});

router.post("/", validateToken, async (req, res) => {
  const { followed } = req.body;
  const follower = req.user.id; // validateToken에 이미 저장되어 있음 routes>Users.js accessToken 확인해봐

  //중복으로 like 할 수 없도록 이미 like 했는지 확인하기
  const found = await Follow.findOne({
    where: { followed: followed, follower: follower },
  });

  if (!found) {
    // like를 아직 안했다면 테이블에 추가
    await Follow.create({ followed: followed, follower: follower });
    res.json({ followed: true }); //pages>Portfolio.js에 response.data로 liked 값을 넘겨줄 수 있음
  } else {
    // like를 이미 했다면 테이블에서 해당 데이터 찾아서 destroy
    await Follow.destroy({ where: { followed: followed, follower: follower } });
    res.json({ followed: false });
  }
});

module.exports = router;

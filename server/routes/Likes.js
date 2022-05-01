const express = require("express");
const router = express.Router();
const { Likes, Posts } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, async (req, res) => {
  const { PostId } = req.body;
  const UserId = req.user.id; // validateToken에 이미 저장되어 있음 routes>Users.js accessToken 확인해봐

  //중복으로 like 할 수 없도록 이미 like 했는지 확인하기
  const found = await Likes.findOne({
    where: { PostId: PostId, UserId: UserId },
  });

  if (!found) {
    // like를 아직 안했다면 테이블에 추가
    await Likes.create({ PostId: PostId, UserId: UserId });
    res.json({ liked: true }); //pages>Portfolio.js에 response.data로 liked 값을 넘겨줄 수 있음
  } else {
    // like를 이미 했다면 테이블에서 해당 데이터 찾아서 destroy
    await Likes.destroy({ where: { PostId: PostId, UserId: UserId } });
    res.json({ liked: false });
  }
});

router.get("/", async (req, res) => {
  const likes = await Likes.findAll();
  res.json(likes);
});

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const likes = await Likes.findAll({ where: { PostId: postId } });
  res.json(likes);
});
router.get("/likedPosts/:userId", async (req, res) => {
  Likes.belongsTo(Posts, {
    targetKey: "id",
    foreignKey: "PostId",
  });
  const liked = await Likes.findAll({
    where: {
      UserId: req.params.userId,
    },
    include: [
      {
        model: Posts,
      },
    ],
  });
  res.json(liked);
});

module.exports = router;

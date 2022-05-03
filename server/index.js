//환경설치
//https://www.youtube.com/watch?v=Hl7diL7SFw8&list=PLpPqplz6dKxUaZ630TY1BFIo5nP-_x-nL&index=1

const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);
const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);
const likesRouter = require("./routes/Likes");
app.use("/likes", likesRouter);
const followRouter = require("./routes/Follow");
app.use("/follow", followRouter);
const messageRouter = require("./routes/Message");
app.use("/message", messageRouter);
// const portfolioRouter = require("./routes/Portfolio");
// app.use("/Portfolio", portfolioRouter);

var client_id = "sp1QymlZx1vxvhn8kJNE"; // 발급받은 CLIENT ID를 넣어줍니다.
var client_secret = "Gxigs4hqIk"; // 발급받은 CLIENT SECRET을 넣어줍니다.
// const ID_KEY = "sp1QymlZx1vxvhn8kJNE";
// const SECRET_KEY = "Gxigs4hqIk";
app.get("/search/book", function (req, res) {
  var api_url =
    "https://openapi.naver.com/v1/search/book?query=" +
    encodeURI(req.query.query); // json 결과
  //   var api_url = 'https://openapi.naver.com/v1/search/blog.xml?query=' + encodeURI(req.query.query); // xml 결과
  var request = require("request");
  var options = {
    url: api_url,
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret,
    },
  };
  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});

// app.listen(3002, function () {
//   console.log(
//     "http://127.0.0.1:3000/search/book?query=검색어 app listening on port 3002!"
//   );
// });

db.sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log("Server running on port 3001");
    });
  })
  .catch((err) => {
    console.log(err);
  });

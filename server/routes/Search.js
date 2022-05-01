const express = require("express");
const router = express.Router();

//네이버 책 검색기능 가져오기
var client_id = "sp1QymlZx1vxvhn8kJNE";
var client_secret = "Gxigs4hqIk";

app.use("/", (req, res) => {
  let text = "아수라";
  const word = text.query.query;
  axios
    .get("https://openapi.naver.com/v1/search/movie.json", {
      params: { query: word, display: 20 },
      headers: {
        "X-Naver-Client-Id": client_id,
        "X-Naver-Client-Secret": client_secret,
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then(function (response) {
      const items = response.data.items;
      res.send({ items: items });
    })
    .catch(function (error) {
      console.log(error);
    });
});

//msyu1207.tistory.com/entry/React로-영화-검색-사이트를-만들어보자-세번째-네이버-API-사용-React-배포-CORS-설정-하기 [로띠 로그]

// router.get("/book", function (req, res) {
//   let text = "용기";
//   var api_url =
//     "https://openapi.naver.com/v1/search/book?display=30&query=" +
//     encodeURI(text.query.query); // json 결과
//   //   var api_url = 'https://openapi.naver.com/v1/search/blog.xml?query=' + encodeURI(req.query.query); // xml 결과
//   var request = require("request");
//   var options = {
//     url: api_url,
//     headers: {
//       "X-Naver-Client-Id": client_id,
//       "X-Naver-Client-Secret": client_secret,
//     },
//   };

//   request.get(options, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
//       res.end(body);
//     } else {
//       res.status(response.statusCode).end();
//       console.log("error = " + response.statusCode);
//     }
//   });
// });

출처: https: module.exports = router;

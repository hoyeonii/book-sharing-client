// const removeTags = require("../pages/removeTags");
import removeTags from "./removeTags";
// function removeTags(text) {
//   return text
//     .replaceAll("&#x0D;", "")
//     .replaceAll("<b>", "")
//     .replaceAll("</b>", "")
//     .replaceAll("&lt;", "")
//     .replaceAll("&gt;", "")
//     .replaceAll("^", "/");
// }

describe("test removeTags", () => {
  test("&gt removed", () => {
    expect(removeTags("ㄱㄱㄱ&gt;Djf")).toEqual("ㄱㄱㄱDjf");
  });

  test("<b> removed", () => {
    expect(removeTags("ㄱㄱㄱ<b>Djf")).toEqual("ㄱㄱㄱDjf");
  });
  test("^ to /", () => {
    expect(removeTags("ㄱㄱㄱ^Djf")).toEqual("ㄱㄱㄱ/Djf");
  });
});

describe("계산 테스트", () => {
  const a = 1,
    b = 2;

  test("a + b는 3이다.", () => {
    expect(a + b).toEqual(3);
  });
});

import axios from "axios";
import loadPosts from "./loadPosts";

jest.mock("axios");

const expected = [
  {
    id: 11,
    title: "해리 포터와 비밀의 방 (미나리마 에디션)",
    description:
      "〈해리 포터〉의 그래픽디자이너 ‘미나리마’가 만든 마법 세계가 다시 열린다!해리 포터 두 번째 이야기, 《비밀의 방: 미나리마 에디션》 전 세계 동시 출간!영화 〈해리 포터〉와 〈신비한 동물사전〉 시리즈에서 비주얼 그래픽을 담당했던 스튜디오 ‘미나리마(MINALIMA)’가 직접 디자인한 《해리 포터와... ",
    author: "J.K. 롤링",
    publisher: "문학수첩",
    isbn: "898392845X 9788983928450",
    genres: "에세이",
    available: true,
    image:
      "https://bookthumb-phinf.pstatic.net/cover/211/767/21176742.jpg?type=m1&udate=20211102",
    createdAt: "2022-05-01T20:52:30.000Z",
    updatedAt: "2022-08-06T20:25:04.000Z",
    UserId: 11,
  },
];

describe("Mocking Modules", () => {
  test("fetch posts", async () => {
    // const expected = [{ name: "Bob" }];
    const resp = { data: expected };
    axios.get.mockResolvedValue(resp);
    // axios.get.mockImplementation(() => Promise.resolve(resp))

    const result = await loadPosts();
    expect(result).toEqual(expected);
  });
});

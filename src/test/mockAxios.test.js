const axios = require("axios");

const fetchData = async (id) => {
  const results = await axios.get(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );
  return results;
};

test.only("mock axios", async () => {
  jest
    .spyOn(axios, "get")
    .mockReturnValueOnce({ data: { id: 34, todo: "olden brown baby" } });

  const result = await fetchData();

  expect(result.data.todo).toBe("olden brown baby");
});

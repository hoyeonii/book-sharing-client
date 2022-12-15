const fetchData = require("./async");

it("should return todo11", () => {
  fetchData(1).then((res) => {
    expect(res.id).toBe(1);
  });
});

it("mock111", () => {
  const callbackFunciton = jest.fn((x) => x + 2);
  callbackFunciton(2);
  callbackFunciton(75);

  expect(callbackFunciton.mock.calls[1][0]).toBe(75);
});

it("mock222", () => {
  const callbackFunciton = jest.fn((x) => x + 2);
  callbackFunciton(2);
  callbackFunciton(75);
  callbackFunciton(4);
  callbackFunciton(98);

  expect(callbackFunciton.mock.calls.length).toEqual(4);
  expect(callbackFunciton.mock.calls[2][0]).toEqual(4);
  expect(callbackFunciton.mock.calls[3][0]).toEqual(98);

  expect(callbackFunciton(55)).toBe(57);
});

it("mock333", () => {
  const callbackFunciton = jest.fn((x) => x + 2);
  callbackFunciton(2);
  callbackFunciton(75);
  callbackFunciton(4);
  callbackFunciton(98);

  expect(callbackFunciton.mock.results.length).toBe(4);
  expect(callbackFunciton.mock.results[2].value).toBe(6);
  expect(callbackFunciton.mock.results[3].value).toBe(100);
});

it("mock444", () => {
  const mockFn = jest.fn();

  mockFn.mockReturnValueOnce(1).mockReturnValueOnce(5).mockReturnValueOnce(111);

  const first = mockFn();
  const second = mockFn();
  const third = mockFn();

  expect(first).toBe(1);
  expect(second).toBe(5);
  expect(third).toBe(111);
});

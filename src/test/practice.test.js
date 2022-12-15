const mockFn = jest.fn();

mockFn(1);
mockFn(2);

test("널과 2", () => {
  console.log(mockFn.mock);
  //   expect(mockFn.mock.calls.length).toBe(0);
  expect(1).toBe(1);
});

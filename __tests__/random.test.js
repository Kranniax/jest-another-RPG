import checkIfEqual from "../lib/random.js";

test("check if 10 is equal to 10", () => {
  expect(checkIfEqual(10, 10)).toBe(true);
});

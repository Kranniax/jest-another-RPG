import { Player } from "../lib/Player";
import { Potion } from "../lib/Potion";
// Then jest.mock() mocks/replaces the constructor's implementation with our faked data.
jest.mock("../lib/Potion.js", () => {
  return {
    Potion: jest.fn().mockImplementation(() => ({
      name: "health",
      value: 20,
    })),
  };
});

test("creates a player object", () => {
  const player = new Player("Dave");
  expect(player.name).toBe("Dave");
  expect(player.health).toEqual(expect.any(Number));
  expect(player.strength).toEqual(expect.any(Number));
  expect(player.agility).toEqual(expect.any(Number));
  expect(player.inventory).toEqual(
    expect.arrayContaining([expect.any(Object)])
  );
});

console.log(new Potion());

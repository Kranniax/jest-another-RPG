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

test("get player's stats as an object", () => {
  const player = new Player("Dave");

  expect(player.getStats()).toHaveProperty("potions");
  expect(player.getStats()).toHaveProperty("health");
  expect(player.getStats()).toHaveProperty("strength");
  expect(player.getStats()).toHaveProperty("agility");
});

test("get inventory from player or return false", () => {
  const player = new Player("Dave");

  expect(player.getInventory()).toEqual(expect.any(Array));

  player.inventory = [];
  expect(player.getInventory()).toEqual(false);
});

console.log(new Potion());

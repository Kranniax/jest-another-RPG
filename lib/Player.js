import { Potion } from "../lib/Potion";

// The name parameter sets a default empty string if no name is provided.
function Player(name = "") {
  this.name = name;
  this.health = Math.floor(Math.random() * 10 + 95);
  this.strength = Math.floor(Math.random() * 5 + 7);
  this.agility = Math.floor(Math.random() * 5 + 7);
  // Creates an array of potion object. two mock data objects will be created.
  this.inventory = [new Potion("health"), new Potion()];
}

Player.prototype.getStats = function () {
  return {
    potions: this.inventory.length,
    health: this.health,
    strength: this.strength,
    agility: this.agility,
  };
};

Player.prototype.getInventory = function () {
  if (this.inventory.length) {
    return this.inventory;
  }
  return false;
};

export { Player };

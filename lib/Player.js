import { Potion } from "./Potion.js";
import { Character } from "./Character.js";

// The name parameter sets a default empty string if no name is provided.
class Player extends Character {
  constructor(name = "") {
    // call parent constructor here:
    super(name);

    // Creates an array of potion object. two mock data objects will be created.
    this.inventory = [new Potion("health"), new Potion()];
  }

  // When using prototype, however, you are only creating the method once on the
  // constructor itself. New player objects simply inherit the method from the
  // constructor rather than having their own instances of that method.
  getStats() {
    return {
      potions: this.inventory.length,
      health: this.health,
      strength: this.strength,
      agility: this.agility,
    };
  }

  getInventory() {
    if (this.inventory.length) {
      return this.inventory;
    }
    return false;
  }

  addPotion(potion) {
    this.inventory.push(potion);
  }

  usePotion(index) {
    // A potion is removed from the orginal inventory array. The removed potion is
    // now added to the potion variable.
    const potion = this.getInventory().splice(index, 1)[0];

    switch (potion.name) {
      case "agility":
        this.agility += potion.value;
        break;
      case "health":
        this.health += potion.value;
        break;
      case "strength":
        this.strength += potion.value;
        break;
    }
  }
}

export { Player };

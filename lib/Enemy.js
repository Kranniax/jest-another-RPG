import { Potion } from "./Potion.js";
import { Character } from "./Character.js";

class Enemy extends Character {
  constructor(name, weapon) {
    // call parent constructor here:
    super(name);

    this.weapon = weapon;
    this.potion = new Potion();
  }
  getDescription() {
    return `A ${this.name} holding a ${this.weapon} has appeared!`;
  }
}

export { Enemy };

import inquirer from "inquirer";
import { Enemy } from "./Enemy.js";
import { Player } from "./Player.js";

function Game() {
  this.roundNumber = 0;
  this.isPlayerTurn = false;
  this.enemies = [];
  this.currentEnemy;
  this.player;
}

Game.prototype.initializeGame = function () {
  this.enemies.push(new Enemy("goblin", "sword"));
  this.enemies.push(new Enemy("orc", "baseball bat"));
  this.enemies.push(new Enemy("skeleton", "axe"));
  // Current enemy in array.
  this.currentEnemy = this.enemies[0];

  // Ask user for player name.
  inquirer
    .prompt({
      type: "text",
      name: "name",
      message: "What is your name?",
    })
    // Destructure name from the prompt object.
    .then(({ name }) => {
      this.player = new Player(name);

      // Test the object crreation
      console.log(this.currentEnemy, this.player);

      // console.log(name);
    });
};

export { Game };

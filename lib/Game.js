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

      this.startNewBattle();
    });
};
Game.prototype.startNewBattle = function () {
  // Whoever has a greater agility score, will go first.
  if (this.player.agility > this.currentEnemy.agility) {
    this.isPlayerTurn = true;
  } else {
    this.isPlayerTurn = false;
  }
  console.log("Your stats are as follows:");

  // Display player stats in table format.
  console.table(this.player.getStats());
  console.log(this.currentEnemy.getDescription());

  this.battle();
};
Game.prototype.battle = function () {
  if (this.isPlayerTurn) {
    // Player prompts will go here.
    inquirer
      .prompt({
        type: "list",
        message: "What would you like to do?",
        name: "action",
        choices: ["Attack", "Use potion"],
      })
      .then(({ action }) => {
        if (action === "Use potion") {
          // Follow-up prompt will go here.
          if (!this.player.getInventory()) {
            console.log("You don't have any potions!");
            return this.checkEndOfBattle();
          }
          inquirer
            .prompt({
              type: "list",
              message: "Which potion would you like to use?",
              name: "action",
              choices: this.player
                .getInventory()
                .map((item, index) => `${index + 1}: ${item.name}`),
            })
            .then(({ action }) => {
              const potionDetails = action.split(":");
              // usePotion accepts an array index for it's arguments.
              this.player.usePotion(potionDetails[0] - 1);

              console.log(`You used a ${potionDetails[1]} potion`);
              this.checkEndOfBattle();
            });
        } else {
          const damage = this.player.getAttackValue();
          this.currentEnemy.reduceHealth(damage);

          console.log(`You attacked the ${this.currentEnemy.name}`);
          console.log(this.currentEnemy.getHealth());
          this.checkEndOfBattle();
        }
      });
  } else {
    const damage = this.currentEnemy.getAttackValue();
    this.player.reduceHealth(damage);

    console.log(`You were attacked by the ${this.currentEnemy.name}`);
    console.log(this.player.getHealth());
    this.checkEndOfBattle();
  }
};

Game.prototype.checkEndOfBattle = function () {
  if (this.player.isAlive() && this.currentEnemy.isAlive()) {
    this.isPlayerTurn = !this.isPlayerTurn;
    this.battle();
  } else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
    console.log(`You've defeated the ${this.currentEnemy.name}`);

    this.player.addPotion(this.currentEnemy.potion);
    console.log(
      `${this.player.name} found a ${this.currentEnemy.potion.name} potion`
    );

    this.roundNumber++;

    if (this.roundNumber < this.enemies.length) {
      this.currentEnemy = this.enemies[this.roundNumber];
      this.startNewBattle();
    } else {
      console.log("You win!");
    }
  } else {
    console.log("You've been defeated!");
  }
};

export { Game };

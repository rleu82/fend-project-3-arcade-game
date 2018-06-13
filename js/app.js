"use strict";
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x; // horizontal (row)
    this.y = y; // vertical (column)
    this.speed = speed; // enemy speed
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = "images/enemy-bug.png";
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    /* Update Enemy position (horizontal x) based off the speed it is traveling and dt parameter as required */
    this.x += this.speed * dt;

    if (this.x > 505) {
        this.x = -101;
        this.y = randomEnemyPos();
        this.speed = randomSpeed();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var myChar = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = "images/char-boy.png";
};

// myChar prototype for update
myChar.prototype.update = function(dt) {
    // Update player position
    this.x += this.speed * dt;
};

// Render player sprite
myChar.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// TODO: increase maxSpeed each time level is completed to add difficulty
let maxSpeed = 500;
// Use maxSpeed to generate random speed of enemy
let randomSpeed = () => {
    let howFast = Math.floor(Math.random() * Math.floor(maxSpeed));
    if (howFast < 50) {
        howFast += 100;
    }
    return howFast;
};
// engine.js created row at 83, therefore randomly place enemy in 83, 2*83=166, 3*83=249. 3 rows random enemy
// Used to test randomEnemyPosArray to find paths. let e1 = number; // testing made these y coords seem correct. top track: 62, 2nd track from top: 145, 3rd track: 228.
let randomEnemyPosArray = [62, 145, 228];
// Create Random Position for enemy based off the three rows(randomEnemyPosArray) the enemy will appear in.
let randomEnemyPos = () =>
    randomEnemyPosArray[Math.floor(Math.random() * randomEnemyPosArray.length)];
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Enemy array to push into allEnemies array
// TODO: Push new enemy into array when difficulty changes
let enemyArray = [
    new Enemy(-101, randomEnemyPos(), randomSpeed()),
    new Enemy(-101, randomEnemyPos(), randomSpeed()),
    new Enemy(-101, randomEnemyPos(), randomSpeed()),
    new Enemy(-101, randomEnemyPos(), randomSpeed())
];
var allEnemies = [];
for (let theEnemy of enemyArray) {
    allEnemies.push(theEnemy);
}

// Place the player object in a variable called player
var player = new myChar(100, 280);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

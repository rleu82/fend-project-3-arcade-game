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

    if (this.x > 707) {
        this.x = -101;
        // randomly place enemy on one of the tracks
        this.y = randomEnemyPos();
        // change speed of enemy once it place back to beginning of track
        this.speed = randomSpeed();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Collision Axis-Aligned Bounding Box Referenced from Mozilla 2D ollision detection.
// Used numbers instead of player.height as stated at Mozilla.
// 73 added to y made character fit perfectly in the tile but I wanted to give more maneuverability
// so I lowered to 70 for adjust for quick movements.
// X is more important in terms of collision. Most of the collisions will take place on x (row). Reducing
// the box width gave more maneuverability and more enjoyable experience.
Enemy.prototype.checkCollisions = function() {
    if (
        this.x < player.x + 65.5 &&
        this.x + 65.5 > player.x &&
        this.y < player.y + 70 &&
        this.y + 70 > player.y
    ) {
        player.x = 303;
        player.y = 664;
    }
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
myChar.prototype.update = function() {
    // Update player position
    // Keep the player sprite within the game area
    // Restricted moving off screen by finding edge coordinates and subtracting row or column to find opposite point
    if (player.y > 570) {
        player.y = 570;
    }

    if (player.y < 0) {
        // player.y = -11;
        player.speed = 0;
        setTimeout(function() {
            player.speed = 101;
            player.x = 303;
            player.y = 664;
        }, 2000);
    }
    // 202 starting location plus (2 x 101 column width) = 404
    if (player.x > 606) {
        player.x = 606;
    }
    // 202 starting location minus (2 x 101 column width) = 0
    if (player.x < 0) {
        player.x = 0;
    }
};

// Render player sprite
myChar.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Required handleInput() method to manage keypress
myChar.prototype.handleInput = function(keyDirection) {
    // playerSpeedX is the same as the column width (101) to create uniform movement to each tile
    let playerSpeedX = player.speed;
    // playerSpeedY is same as row height (83). used player.speed as base minus 18 to get 83
    let playerSpeedY = player.speed - 18;
    if (keyDirection == "up") {
        player.y -= playerSpeedY;
    }
    if (keyDirection == "down") {
        player.y += playerSpeedY;
    }
    if (keyDirection == "left") {
        player.x -= player.speed;
    }
    if (keyDirection == "right") {
        player.x += player.speed;
    }
};
// TODO: increase maxSpeed each time level is completed to add difficulty
let maxSpeed = 400;
// Use maxSpeed to generate random speed of enemy
let randomSpeed = () => {
    let howFast = Math.floor(Math.random() * Math.floor(maxSpeed));
    if (howFast < 50) {
        howFast += 100;
    }
    return howFast;
};

// Used to test randomEnemyPosArray to find paths. let e1 = number; // testing made these y coords seem correct. top track: 62, 2nd track from top: 145, 3rd track: 228.
let randomEnemyPosArray = [62, 145, 228, 311, 394];
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
var player = new myChar(303, 664, 101);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        80: "pause"
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

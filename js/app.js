'use strict';
// Enemies our player must avoid
let Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x; // horizontal (row)
    this.y = y; // vertical (column)
    this.speed = speed; // enemy speed
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
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
        player.speed = 0;
        playerSpeedY = 0;
        player.x = 303;
        player.y = 664;
        buggedOut();
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let myChar = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

// myChar prototype for update
myChar.prototype.update = function() {
    // Update player position
    // Keep the player sprite within the game area
    // Restricted moving off screen by finding edge coordinates and subtracting row or column to find opposite point
    if (player.y > 570) {
        player.y = 570;
    }
    // Player reaches water. Player clears level.
    // Player is set back to starting to start next level.
    if (player.y < 0) {
        player.y = -11;
        player.speed = 0;
        playerSpeedY = 0;
        player.x = 303;
        player.y = 664;
        reachedWater();
        setTimeout(function() {
            nextRound();
        }, 3000);
    }
    // 202 starting location plus (2 x 101 column width) = 404
    if (player.x > 606) {
        player.x = 606;
    }
    // 202 starting location minus (2 x 101 column width) = 0
    if (player.x < 0) {
        player.x = 0;
    }
    if (curLives == 0) {
        gameOver();
    }
};

// Render player sprite
myChar.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Required handleInput() method to manage keypress
// player.speed is the same as the column width (101) to create uniform movement to each tile
// playerSpeedY is same as row height (83). used player.speed as base minus 18 to get 83
let playerSpeedY = 83;
myChar.prototype.handleInput = function(keyDirection) {
    if (keyDirection == 'up') {
        player.y -= playerSpeedY;
        updateScore();
    }
    if (keyDirection == 'down') {
        player.y += playerSpeedY;
        updateScore();
    }
    if (keyDirection == 'left') {
        player.x -= player.speed;
        updateScore();
    }
    if (keyDirection == 'right') {
        player.x += player.speed;
        updateScore();
    }
};

// Gem Constructor
let itemGem = function(x, y, boxNum) {
    this.x = x;
    this.y = y;
    this.boxNum = boxNum;
    this.sprite = randomGemSprite();
};

// Render Gem
itemGem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Check Gem Collision
itemGem.prototype.checkCollisions = function() {
    let boxID = document.getElementById(this.boxNum);
    let addPoints = `<span>+100</span>`;
    if (
        this.x < player.x + 65.5 &&
        this.x + 65.5 > player.x &&
        this.y < player.y + 70 &&
        this.y + 70 > player.y
    ) {
        curScore = curScore + 100;
        updateScore();
        highScore();
        boxID.innerHTML = addPoints;
        boxID.classList.add('animated', 'fadeOutUp');
        this.x = -300;
        this.y = -300;
        setTimeout(function() {
            boxID.classList.remove('animated', 'fadeOutUp');
            boxID.innerHTML = ``;
        }, 3000);
    }
};

// Generate random gem locations: x, y, boxNum (for CSSgrid interaction)
let gridGemsPos = function() {
    // Grid positions stored as objects / gems place in enemy tracks
    let randomGemPosArray = [
        // row 1 of enemy track y = 62
        { x: 0, y: 62, boxNum: 'b15' },
        { x: 101, y: 62, boxNum: 'b16' },
        { x: 202, y: 62, boxNum: 'b17' },
        { x: 303, y: 62, boxNum: 'b18' },
        { x: 404, y: 62, boxNum: 'b19' },
        { x: 505, y: 62, boxNum: 'b20' },
        { x: 606, y: 62, boxNum: 'b21' },
        // row 2 of enemy track y = 145
        { x: 0, y: 145, boxNum: 'b22' },
        { x: 101, y: 145, boxNum: 'b23' },
        { x: 202, y: 145, boxNum: 'b24' },
        { x: 303, y: 145, boxNum: 'b25' },
        { x: 404, y: 145, boxNum: 'b26' },
        { x: 505, y: 145, boxNum: 'b27' },
        { x: 606, y: 145, boxNum: 'b28' },
        // row 3 of enemy track y = 228
        { x: 0, y: 228, boxNum: 'b29' },
        { x: 101, y: 228, boxNum: 'b30' },
        { x: 202, y: 228, boxNum: 'b31' },
        { x: 303, y: 228, boxNum: 'b32' },
        { x: 404, y: 228, boxNum: 'b33' },
        { x: 505, y: 228, boxNum: 'b34' },
        { x: 606, y: 228, boxNum: 'b35' },
        // row 4 of enemy track y = 311
        { x: 0, y: 311, boxNum: 'b36' },
        { x: 101, y: 311, boxNum: 'b37' },
        { x: 202, y: 311, boxNum: 'b38' },
        { x: 303, y: 311, boxNum: 'b39' },
        { x: 404, y: 311, boxNum: 'b40' },
        { x: 505, y: 311, boxNum: 'b41' },
        { x: 606, y: 311, boxNum: 'b42' },
        // row 5 of enemy track y = 394
        { x: 0, y: 394, boxNum: 'b43' },
        { x: 101, y: 394, boxNum: 'b44' },
        { x: 202, y: 394, boxNum: 'b45' },
        { x: 303, y: 394, boxNum: 'b46' },
        { x: 404, y: 394, boxNum: 'b47' },
        { x: 505, y: 394, boxNum: 'b48' },
        { x: 606, y: 394, boxNum: 'b49' }
    ];
    // Randomize selection of gem location (randomGemPosArray object)
    // Get random object index and store in gemObject
    let randomGemObjectIndex = Math.floor(
        Math.random() * randomGemPosArray.length
    );
    let gemObject = randomGemPosArray[randomGemObjectIndex];
    return gemObject;
};

// Get random sprite from gem sprite array
let randomGemSpriteArray = [
    'images/Gem-Blue.png',
    'images/Gem-Green.png',
    'images/Gem-Orange.png'
];
let randomGemSprite = () =>
    randomGemSpriteArray[
        Math.floor(Math.random() * randomGemSpriteArray.length)
    ];

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

// Top track starts: 62, 2nd track from top: 145, 3rd track: 228, 4th track: 311, 5th track: 394;
let randomEnemyPosArray = [62, 145, 228, 311, 394];
// Create Random Position for enemy based off the three rows(randomEnemyPosArray) the enemy will appear in.
let randomEnemyPos = () =>
    randomEnemyPosArray[Math.floor(Math.random() * randomEnemyPosArray.length)];

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// TODO: Push new enemy into array when difficulty changes
let allEnemies = [
    new Enemy(-101, randomEnemyPos(), randomSpeed()),
    new Enemy(-101, randomEnemyPos(), randomSpeed()),
    new Enemy(-101, randomEnemyPos(), randomSpeed()),
    new Enemy(-101, randomEnemyPos(), randomSpeed()),
    new Enemy(-101, randomEnemyPos(), randomSpeed()),
    new Enemy(-101, randomEnemyPos(), randomSpeed()),
    new Enemy(-101, randomEnemyPos(), randomSpeed())
];

// Place the player object in a variable called player
let player = new myChar(303, 664, 101);

// Generate 3 Gems and place them in array(allGems) to render
let gemOne = gridGemsPos();
let gemTwo = gridGemsPos();
let gemThree = gridGemsPos();
let firstGem = new itemGem(gemOne.x, gemOne.y, gemOne.boxNum);
let secondGem = new itemGem(gemTwo.x, gemTwo.y, gemTwo.boxNum);
let thirdGem = new itemGem(gemThree.x, gemThree.y, gemThree.boxNum);
let allGems = [firstGem, secondGem, thirdGem];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        80: 'pause'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

let curLevel = 1;
let curScore = 0;
let curLives = 5;

function buggedOut() {
    curLives--;
    let bugMessage = `<span>You bugged out! ${curLives} lives left!</span>`;
    if (curLives === 1) {
        bugMessage = `<span>You bugged out! ${curLives} life left!</span>`;
    }
    let theSecondBanner = document.getElementById('second-banner');
    theSecondBanner.innerHTML = bugMessage;
    theSecondBanner.classList.add('animated', 'tada');
    setTimeout(function() {
        nextLife();
    }, 1000);
    setTimeout(function() {
        clearAnnounce();
    }, 2000);
}
// score and level tracking variables
// level increase each time player reaches water
// score will increase when: movement above grass safe is 50 points, gem give 100 points, clearing level 500 points
function reachedWater() {
    levelAnnounce();
    // increase level number and add score for clearing level
    curLevel++;
    curScore = curScore + 500;
    updateScore();
    highScore();
}

function levelAnnounce() {
    let theBanner = document.getElementById('banner-container');
    // Insert level cleared message and animate level clear message using AnimateCSS
    let atWaterMessage = `<span>Level ${curLevel} Cleared!</span>`;
    theBanner.innerHTML = atWaterMessage;
    theBanner.classList.add('animated', 'bounceIn');
}

function clearAnnounce() {
    let theBanner = document.getElementById('banner-container');
    let theSecondBanner = document.getElementById('second-banner');
    theSecondBanner.classList.remove('animated', 'tada');
    theBanner.classList.remove('animated', 'bounceIn');
    theBanner.innerHTML = ``;
    theSecondBanner.innerHTML = ``;
}

function nextRound() {
    player.speed = 101;
    playerSpeedY = 83;
    clearAnnounce();
    // instantiate gems for next round
    reInstantiateGems();
}

function nextLife() {
    player.speed = 101;
    playerSpeedY = 83;
}

function gameEndBanner() {
    let theBanner = document.getElementById('banner-container');
    let theThirdBanner = document.getElementById('third-banner');
    let endMessage = `<span>Game Over</span>`;
    let endMessage2 = `<span>Press ESC To Restart</span>`;
    theBanner.innerHTML = endMessage;
    theThirdBanner.innerHTML = endMessage2;
    theBanner.classList.add('animated', 'flash', 'infinite');
    theThirdBanner.classList.add('animated', 'tada');
}
function gameOver() {
    player.speed = 0;
    playerSpeedY = 0;
    gameEndBanner();
}
function updateScore() {
    let scoreSpan = document.getElementById('box1-info1');
    scoreSpan.innerHTML = `<span>Score: ${curScore}</span>`;
    if (player.y < 477) {
        curScore = curScore + 50;
        scoreSpan.innerHTML = `<span>Score: ${curScore}</span>`;
        highScore();
    }
}

function highScore() {
    let highScoreSpan = document.getElementById('box1-info2');
    let curHighScore = Number(localStorage.HighScore);
    highScoreSpan.innerHTML = `<span>High Score: ${curHighScore}</span>`;
    if (localStorage.HighScore) {
        if (curScore >= curHighScore) {
            localStorage.HighScore = curScore;
            highScoreSpan.innerHTML = `<span>High Score: ${curScore}</span>`;
        }
    } else {
        localStorage.HighScore = 0;
    }
}

function reInstantiateGems() {
    let gemOne = gridGemsPos();
    let gemTwo = gridGemsPos();
    let gemThree = gridGemsPos();
    firstGem.x = gemOne.x;
    firstGem.y = gemOne.y;
    firstGem.boxNum = gemOne.boxNum;
    firstGem.sprite = randomGemSprite();
    secondGem.x = gemTwo.x;
    secondGem.y = gemTwo.y;
    secondGem.boxNum = gemTwo.boxNum;
    secondGem.sprite = randomGemSprite();
    thirdGem.x = gemThree.x;
    thirdGem.y = gemThree.y;
    thirdGem.boxNum = gemThree.boxNum;
    thirdGem.sprite = randomGemSprite();
    allGems = [firstGem, secondGem, thirdGem];
}

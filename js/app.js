var xMult = 101;
var yMult = 83;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = 0;
    this.y = (Math.floor(Math.random() * 3) + 1) * yMult;
    this.speed = (Math.floor(Math.random() * 3) + 1);

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
   this.x += this.speed;
   if (this.x === player.x && this.y === player.y) {
       player.reset();
   }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 2 * xMult;
    this.y = 4 * yMult;
    this.reset = function() {
        this.x = 2 * xMult;
        this.y = 4 * yMult;
    }
}

Player.prototype.update = function() {
    // check if char position == enemy position
    //loop through enemy array
    allEnemies.forEach(enemy => {
        if (this.x == enemy.x && this.y == enemy.y) {
            // reset player position
            this.reset();
        }
    });
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(input) {
    switch (input) {
        case 'left':
            if (this.x !== 0) {
                this.x -= xMult;
            }
            break;
        case 'right':
            if (this.x !== 4 * xMult) {
                this.x += xMult;
            }
            break;
        case 'up':
            if (this.y !== 0) {
                this.y -= yMult;
            }
            break;
        case 'down':
            if (this.y !== 5 * yMult) {
                this.y += yMult;
            }
            break;
    }
    if (this.y === 0) {
        this.reset();
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
setInterval(()=> {
    allEnemies.push(new Enemy());
}, 2000);
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

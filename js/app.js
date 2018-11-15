// Enemies our player must avoid
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    constructor(x,y,speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
     update(dt) {
        if (this.x > 404) {
            this.x = 0;
        }
        else {
            this.x += this.speed * dt;
        }

        if (player.x < this.x + 80 && player.x + 80 > this.x &&
            player.y < this.y + 60 && player.y + 60 > this.y) {
            alert('Uh-Oh! You lost!');
            player.resetPlayerPosition();
        }
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.x = 202;
        this.y = 404;
        this.sprite = 'images/char-pink-girl.png';
    }

    update(dt) {

    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(keyCode) {

        switch(keyCode) {
            case 'left':
            if (this.x > 0) {
                this.x -= 102;
            }
            break;
            case 'right':
            if (this.x < 404) {
                this.x += 102;
            }
            break;
            case 'up':
            if (this.y > 0) {
                this.y -= 83;
            }
            break;
            case 'down':
            if (this.y < 404) {
                this.y += 83;
            }
            break;
        }
        if (this.y < 0) {
            setTimeout(function() {
                alert('Hey')
                player.resetPlayerPosition()
            }, 600);
        }
    }

    resetPlayerPosition()
    {
        player.x = 202;
        player.y = 404;
        this.render();
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Player;
let enemy1 = new Enemy(302, 140, 95),
    enemy2 = new Enemy(383, 230, 150),
    enemy3 = new Enemy(101, 60, 100);
let allEnemies = [enemy1,enemy2,enemy3];



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

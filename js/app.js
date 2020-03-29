//superclass containing similar characteristics
class Character {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Enemies our player must avoid
class Enemy extends Character {
    // Variables applied to each of our instances go here
    constructor(x,y,speed) {
        super(x,y);
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
            player.y < this.y + 55 && player.y + 55 > this.y) {
            alert('Uh-Oh! You lost!');
            player.resetPlayerPosition();
        }
    }
    // Draw the enemy on the screen, required method for game
    render(){
        super.render();
    }

}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Character {
    constructor(x,y) {
        super(x,y);
        this.x = 202;
        this.y = 404;
        this.sprite = 'images/char-pink-girl.png';
        this.tileWidth = 101;
        this.tileHeight = 83;
        this.topEnd = 404 - 83*5;
        this.bottomEnd = 404;
        this.leftEnd = 0;
        this.rightEnd = 404;
        this.keys = 0;
    }

    update() {
         if(this.y === this.topEnd){
            alert('Congratulations! You won!!!');
            this.resetPlayerPosition();
        }

        switch(this.keys) {
            case 'left':
            if (this.x != this.leftEnd) {
                this.x -= this.tileWidth;
            }
            break;
            case 'right':
            if (this.x != this.rightEnd) {
                this.x += this.tileWidth;
            }
            break;
            case 'up':
            if (this.y != this.topEnd) {
                this.y -= this.tileHeight;
            }
            break;
            case 'down':
            if (this.y != this.bottomEnd) {
                this.y += this.tileHeight;
            }
            break;
        }
        this.keys = 0;
    }

    // Draw the player on the screen, required method for game
    render(){
        super.render();
    }

    // Update the player's position, based on the key pressed
    handleInput(keyPress) {
        this.keys = keyPress;
    }

    //reset the player position
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

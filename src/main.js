/*
Treasure Tower
Group 2
Sonia Atre, Fernanda Becerra, Brian Zhang
For visual effects, we really enjoyed implementing the particle effects 
that spawn when the player unlocks the treasure chest and the timer
for the invincibility effect.
For technical aspects, we were able to implement being able to destroy 
the cracked tiles, which was very difficult for us and we were proud
to have it work the way it does. The tower, affected by gravity, can be 
jumped on and fall faster, which is fun to play as the player can essentially
burrow through cracked tiles on level 3.
*/

//global 
let cursors;
const SCALE = .5;
const tileSize = 30;


//main game object
let config = {
    type: Phaser.CANVAS,
    /*
    //prevents edge bleedings
    render: {
        pixelArt: true
    },
    */
    width: 1500,
    height: 1000,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    zoom: 1,
    scene: [Load, TitleScene, LevelScene, Play, Puzzle1, Play2, Play3, EndScene, WinScene]
  }
  //define game
let game = new Phaser.Game(config);

//reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;
// set UI sizes
let borderUISize = game.config.height / 15;
console.log(borderUISize);
let scrollSpeed = 4;
let borderPadding = borderUISize / 3;
let width = game.config.width;
let height = game.config.height;
let centerX = game.config.width/2;
let centerY = game.config.height/2;
const textSpacer = 64;
let score;
let highScore;
let cont=false;
let quit=false
let playNow=false;
let newHighScore = false;
let playerWalking=false;
let moveCam=false;
let facingRight=true;
let puzzle1Scene=false;
let foundKey1=false;
let foundKey2=false;
let foundKey3=false;
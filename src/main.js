//global 
let cursors;
const SCALE = .5;
const tileSize = 30;


//main game object
let config = {
    type: Phaser.CANVAS,
    width: 1500,
    height: 1000,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    zoom: 1,
    scene: [Play, Puzzle1, EndScene]
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
let towerExists=false;
let playerWalking=false;
let moveCam=false;
let facingRight=true;
let puzzleScene=false;
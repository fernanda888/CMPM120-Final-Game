class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        this.load.path = 'assets/';
        //titleScene
        this.load.image('titleScreen', 'sky.png');
        this.load.image('playButton', 'PLAY.png');
        this.load.image('bgClouds', 'bgClouds.png');
        this.load.image('fgClouds', 'fgClouds.png');
        this.load.image('bgMountains', 'bgMountains.png');
        this.load.image('fgMountains', 'fgMountains.png');
        this.load.image('sky', 'sky.png');
        this.load.image('levelTower', 'levelTower.png');
        this.load.image('button1', 'button1.png');
        this.load.image('button2', 'button2.png');
        this.load.image('button3', 'button3.png');

        //load sounds
         this.load.audio('jumping', 'jumping.mp3');
         this.load.audio('walking', 'walking_sound.mp3');
         this.load.audio('musicL1', 'TowerMusic(1).wav');
         this.load.audio('tileBreak', 'tower.mp3');
         this.load.audio('tower', 'tower.wav');
         this.load.audio('keySound', 'keySound.wav');
         this.load.audio('enemyKill', 'enemyKill.wav');
 
         //load images
         this.load.image('character', 'character.png');
         this.load.image('characterJump', 'characterJump.png');
         this.load.image('tower', 'tower.png');
         this.load.spritesheet('l1enemy', 'enemyGround.png', { frameWidth: 150, frameHeight: 100});
         this.load.spritesheet('l2enemy', 'enemyFlying.png', { frameWidth: 250, frameHeight: 230});

         this.load.image('chest', 'chest.png');
         this.load.image('rock', 'rock1.png');
         this.load.image('purpleKey', 'purpleKey.png');
         this.load.image('greenKey', 'greenKey.png');
         this.load.image('blueKey', 'blueKey.png');
         this.load.image('powerUp', 'powerUp.png');
         this.load.image('powerUp3', 'invincibility.png');
         this.load.image('borderH', 'borderH.png');
         this.load.image('keyFrame', 'keyFrame.png');
         this.load.image('towerFrame', 'towerFrame.png');
         this.load.image('lock', 'lock.jpeg');
         this.load.spritesheet('charRun', 'characterRun.png', {
             frameWidth: 600, frameHeight: 600, startFrame: 0, endFrame: 7
         });
         this.load.spritesheet('charTower', 'characterTower.png', {
             frameWidth: 600, frameHeight: 600, startFrame: 0, endFrame: 5
         });

         //load the json images 
        this.load.image('tiles', 'rockSheetNew.png');
        this.load.tilemapTiledJSON("tilemapJSON", "levelOneNew.json");

        this.load.image('tiles2', 'levelTwoRocksheet.png');
        this.load.tilemapTiledJSON("tilemap2JSON", "levelTwo.json");
        this.load.tilemapTiledJSON("tilemap3JSON", "levelThree.json");
    }

    create() {
        // ...and pass to the next Scene
        this.scene.start('titleScene');
    }
}
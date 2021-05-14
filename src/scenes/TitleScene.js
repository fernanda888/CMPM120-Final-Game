class TitleScene extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    preload() {
        // set load path
        this.load.path = 'assets/';
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
    }

    create() {
        //title
        var img = this.add.image(game.config.width, 
            game.config.height, 'titleScreen');
        img.scale = 1
        img.setOrigin(1,1);

        //button play
        var playButton = this.add.image(game.config.width,
            game.config.height, 'playButton');
        playButton.scale = .5;
        playButton.setOrigin(3.5, 12);
        playButton.setInteractive();
        playButton.on('pointerdown', () => { 
            this.clickButton();
        });
        this.add.image(game.config.width, game.config.height, 'fgClouds').setOrigin(1,1);
    }

    clickButton() {
        this.scene.start('levelScene');
    }

}
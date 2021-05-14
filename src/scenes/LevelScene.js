class LevelScene extends Phaser.Scene {
    constructor() {
        super('levelScene');
    }

    create(){
        //add the iamges in which they appear in
        this.add.image(game.config.width, game.config.height, 'sky').setOrigin(1,1);
        this.bgClouds = this.add.tileSprite(0, 0, game.config.width, 
            game.config.height, 'bgClouds').setOrigin(0, 0);
        this.fgClouds = this.add.tileSprite(0, 0, game.config.width, 
            game.config.height, 'fgClouds').setOrigin(0, 0);
        this.bgMountains = this.add.tileSprite(0, 0, game.config.width, 
            game.config.height, 'bgMountains').setOrigin(0, 0);
        //tower
        this.add.image(game.config.width, game.config.height, 'levelTower').setOrigin(1,1);

        //adds three level selections to the menu
        var playButton1 = this.add.image(game.config.width/2 + 7.5,
            game.config.height/3 + 36.5, 'button1');
        var playButton2 = this.add.image(game.config.width/2 + 7.5,
            game.config.height/2 + 132, 'button2');
        var playButton3 = this.add.image(game.config.width/2 + 7.5,
            game.config.height/1.5 + 236.5, 'button3');

        //foreground rocks
        this.fgMountains = this.add.tileSprite(0, 0, game.config.width, 
            game.config.height, 'fgMountains').setOrigin(0, 0);
            
        //makes all the buttons have the same visual property
        this.buttonSetup(playButton1);
        this.buttonSetup(playButton2);
        this.buttonSetup(playButton3);

        playButton1.on('pointerdown', () => { 
            this.clickButton();
        });
    }
    buttonSetup(button){
        button.rotation = -0.8;
        button.setInteractive();
        button.on('pointerover', ()=>{
            button.setTint(0x9BEC7C);
            //button.alpha = 0.7;
        });
        button.on('pointerout', ()=>{
            button.setTint();
            //button.alpha = 1;
        });
    }
    update(){
        this.bgClouds.tilePositionX -= scrollSpeed/8;
        this.fgClouds.tilePositionX -= scrollSpeed/4;
        this.bgMountains.tilePositionX += scrollSpeed/6;
    }
    clickButton() {
        this.scene.start('playScene');
    }
}
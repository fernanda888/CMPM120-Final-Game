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
        this.playButton3 = this.add.image(game.config.width/2 + 7.5,
            game.config.height/3 + 36.5, 'button3');
        this.playButton2 = this.add.image(game.config.width/2 + 7.5,
            game.config.height/2 + 132, 'button2');
        this.playButton1 = this.add.image(game.config.width/2 + 7.5,
            game.config.height/1.5 + 236.5, 'button1');

        //add locks to levels
        this.l1 = JSON.parse(localStorage.getItem("l1Complete"));
        console.log(this.l1);
        this.l2 = JSON.parse(localStorage.getItem("l2Complete"));
        //var l3 = JSON.parse(localStorage.getItem("level1"));

        if (!this.l1) {
            this.lock2 = this.add.image(game.config.width/2 + 7.5,
                game.config.height/2 + 132, 'lock');
            this.lock2.setScale(0.3);
        }

        if (!this.l2) {
            this.lock3 = this.add.image(game.config.width/2 + 7.5,
                game.config.height/3 + 36.5, 'lock');
            this.lock3.setScale(0.3);
        }

        //foreground rocks
        this.fgMountains = this.add.tileSprite(0, 0, game.config.width, 
            game.config.height, 'fgMountains').setOrigin(0, 0);
            
        //makes all the buttons have the same visual property
        this.buttonSetup(this.playButton1);
        this.buttonSetup(this.playButton2);
        this.buttonSetup(this.playButton3);

        this.playButton1.on('pointerdown', () => { 
            this.scene.start('playScene');
        });

        if (this.l1) {
            this.playButton2.on('pointerdown', () => { 
                this.scene.start('play2Scene');
            });
        }

        if (this.l2) {
            this.playButton3.on('pointerdown', () => { 
                this.scene.start('play3Scene');
            });
        } 

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
}
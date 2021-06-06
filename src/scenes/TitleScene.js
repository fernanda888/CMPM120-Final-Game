class TitleScene extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    create() {
        this.createBackground();
        this.createSounds();
        this.createPlayButton();
        // this.time.delayedCall(17000, () => {
            
        // });

    }

    createBackground() {
        //the sprites and movement
        this.add.image(game.config.width, game.config.height, 'sky').setOrigin(1,1);
        this.bgClouds = this.add.tileSprite(0, 0, game.config.width, 
            game.config.height, 'bgClouds').setOrigin(0, 0);
        this.fgClouds = this.add.tileSprite(0, 0, game.config.width, 
            game.config.height, 'fgClouds').setOrigin(0, 0);
        this.bgMountains = this.add.tileSprite(0, 0, game.config.width, 
            game.config.height, 'bgMountains').setOrigin(0, 0);
        this.fgMountains = this.add.tileSprite(0, 0, game.config.width, 
            game.config.height, 'fgMountains').setOrigin(0, 0);
        this.credits = this.add.image(game.config.width, game.config.height, 'titleCredits').setOrigin(1,1);
    }

    createSounds(){
        //sounds for the level clicking actions
        this.key_sound = this.sound.add('keySound', {
            mute: false,
            volume: .2,
        });
    }

    createPlayButton() {
        //button play
        var state = 0;
        var playButton = this.add.image(game.config.width,
            game.config.height, 'playButton');
        playButton.scale = 1;
        playButton.setOrigin(2, 4.7);
        playButton.setInteractive();
        playButton.on('pointerdown', () => {
            if(state==0){
                this.key_sound.play();
                playButton.setOrigin(2, 3);
                state+=1;
                this.credits.destroy();
                this.createBgStory();
           }else if(state==1){
                this.key_sound.play();
                this.scene.start('levelScene');
           }
        });
    }

    clickButton() {
        this.scene.start('levelScene');
    }

    createBgStory() {
        this.label = this.add.text(width/4, height/4, '', {font: '40px TypeReg', fill: '#000000', wordWrap: {width: width/1.5}});
        this.storyText = 'Greetings! You have been chosen to complete a challenging, treacherous quest. Many have failed before, but you have been chosen for your highly qualified skillset and strength. Your quest, should you accept it or not, is to advance the Treasure Tower. Each floor, or level, of the tower holds a treasure, but the treasure is protected by dangerous enemies on each floor. Should you defeat the enemies and obtain the treasures in each level, you will be rewarded with a large sum of the treasure!';
        this.typewriterTextWrapped(this.storyText);
    }

    typewriterTextWrapped(text) {
        const lines = this.label.getWrappedText(text);
        const wrappedText = lines.join('\n');
        this.typewriteText(wrappedText);
    }

    //https://blog.ourcade.co/posts/2020/phaser-3-typewriter-text-effect-bitmap/
    typewriteText(text) {
        const length = text.length;
        let i = 0;
        this.time.addEvent({
            callback: () => {
                this.label.text += text[i];
                ++i;
            },
            repeat: length - 1,
            delay: 20
        })
    }
    update(){
        this.bgClouds.tilePositionX -= scrollSpeed/8;
        this.fgClouds.tilePositionX -= scrollSpeed/4;
        this.bgMountains.tilePositionX += scrollSpeed/6;
    }
}
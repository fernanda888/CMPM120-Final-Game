class TitleScene extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    create() {
        this.createBackground();
        this.createBgStory();
        this.createPlayButton();
        // this.time.delayedCall(17000, () => {
            
        // });

    }

    createBackground() {
        //title
        var img = this.add.image(game.config.width,
            game.config.height, 'titleScreen');
        img.scale = 1
        img.setOrigin(1, 1);
        this.add.image(game.config.width, game.config.height, 'fgClouds').setOrigin(1, 1);
    }

    createPlayButton() {
        //button play
        var playButton = this.add.image(game.config.width,
            game.config.height, 'playButton');
        playButton.scale = 1;
        playButton.setOrigin(2, 3);
        playButton.setInteractive();
        playButton.on('pointerdown', () => {
            this.clickButton();
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
}
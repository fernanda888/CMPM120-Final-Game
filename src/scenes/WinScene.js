class WinScene extends Phaser.Scene {
    constructor() {
        super('winScene');
    }

    create(screen) {
        this.winMusic = this.sound.add('winMusic', { 
            mute: false,
            loop: false,
            rate: 1.05,
            volume: 0.1
        });
        this.winMusic.play();
        //winScreen
        var win = this.add.image(game.config.width,
            game.config.height, 'winScreen');
        win.scale = 1
        win.setOrigin(1, 1);

        //button restart
        this.screen = screen;
        var restartButton = this.add.image(game.config.width,
            game.config.height, 'restartButton');
        restartButton.scale = 0.18
        restartButton.setOrigin(5.7, 1.5);
        restartButton.setInteractive();
        restartButton.on('pointerdown', function (pointer) {
            cont = true;
        }, this);

        //button quit
        var quitButton = this.add.image(game.config.width,
            game.config.height, 'quitButton');
        quitButton.scale = 0.18
        quitButton.setOrigin(1.1, 1.5);
        quitButton.setInteractive();
        quitButton.on('pointerdown', function (pointer) {
            quit = true;
        }, this);

    }


    update() {
        if (cont == true) {
            cont = false;
            this.sound.removeAll();
            this.scene.start(this.screen);
        }
        else if (quit == true) {
            quit = false;
            this.sound.removeAll();
            this.scene.start('titleScene');
        }
    }
}

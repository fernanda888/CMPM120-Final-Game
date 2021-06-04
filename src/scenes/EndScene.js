class EndScene extends Phaser.Scene {
    constructor() {
        super('endScreen');
    }
    preload() {
        this.load.image('restartButton', 'assets/restartButton.png');
        this.load.image('quitButton', 'assets/quitButton2.png');
        this.load.image('endScreen', 'assets/endScreen.png');
    }

    create() {
        //endScreen
        var end = this.add.image(game.config.width,
            game.config.height, 'endScreen');
        end.scale = 1
        end.setOrigin(1, 1);

        //button restart
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
            this.scene.start('playScene');
        }
        else if (quit == true) {
            quit = false;
            this.scene.start('titleScene');
        }
    }
}

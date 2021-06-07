class Puzzle1 extends Phaser.Scene {
    constructor() {
        super('puzzle1Scene');
    }
    create(level) {
        //create audio
        this.puzzleEnd = this.sound.add('puzzleEnd', {
            mute: false,
            loop: false,
            rate: 1,
            volume: 0.4
        });
        this.keySound = this.sound.add('keySound', {
            mute: false,
            loop: false,
            rate: 1,
            volume: 0.05
        });



        //variables
        this.ACCELERATION = 5;
        this.MAX_X_VEL = 500;   // pixels/second
        this.MAX_Y_VEL = 5000;
        this.physics.world.gravity.y = 2600;
        this.spacebar = this.input.keyboard.addKey('SPACE');
        this.level = level;

        //puzzle scene boolean for tower
        puzzle1Scene = true;

        this.cameras.main.setBackgroundColor('#D0D0D0');

        //add background
        this.backG = this.add.image(width / 2, height / 2, 'puzzleBack');
        this.backG.setScale(2.5);

        //add treasure chest
        this.chest = this.physics.add.sprite(width / 2, height / 2 + 190, 'chest');
        this.chest.setScale(1.5);
        this.chest.body.allowGravity = false;
        this.chest.body.immovable = true;
        this.chest.body.moves = false;


        this.rect1 = this.add.rectangle(527, 662, 100, 100, 0x000000);
        this.rect2 = this.add.rectangle(750, 662, 100, 100, 0x000000);
        this.rect3 = this.add.rectangle(972, 662, 100, 100, 0x000000);
        this.selectRect = this.add.rectangle(527, 662, 100, 100, 0xff33cc);
        this.rotateRect(this.rect1);
        this.rotateRect(this.rect2);
        this.rotateRect(this.rect3);
        this.rotateRect(this.selectRect);
        this.flashing = this.tweens.add({
            targets: this.selectRect,
            alpha: 0,
            yoyo: true,
            repeat: -1
        });
        //set up key visual
        this.keyFrame = this.add.image(width / 1.2, height / 6, 'keyFrame').setScale(0.50).setScrollFactor(0);
        this.topkey1 = this.add.image(this.keyFrame.x - 90, this.keyFrame.y, 'purpleKey').setScale(0.45).setScrollFactor(0);
        if (foundKey1) {
            this.topkey1.alpha = 1;
        }
        else {
            this.topkey1.alpha = .5;
        }
        this.topkey2 = this.add.image(this.keyFrame.x, this.keyFrame.y, 'greenKey').setScale(0.45).setScrollFactor(0);
        if (foundKey2) {
            this.topkey2.alpha = 1;
        }
        else {
            this.topkey2.alpha = .5;
        }
        this.topkey3 = this.add.image(this.keyFrame.x + 90, this.keyFrame.y, 'blueKey').setScale(0.45).setScrollFactor(0);
        if (foundKey3) {
            this.topkey3.alpha = 1;
        }
        else {
            this.topkey2.alpha = .5;
        }
        //booleans to check keys places
        this.purpleKey = false;
        this.blueKey = false;
        this.greenKey = false;

    }
    rotateRect(rectangle) {
        rectangle.angle += 45;
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            if (foundKey1 && !this.purpleKey) {
                this.purpleKey = true;
                this.rect1.destroy();
                this.keySound.play();
                this.selectRect.x = this.rect2.x;
                this.selectRect.y = this.rect2.y;
            }
            else if (foundKey2 && !this.blueKey) {
                this.blueKey = true;
                this.rect2.destroy();
                this.keySound.play();
                this.selectRect.x = this.rect3.x;
                this.selectRect.y = this.rect3.y;
            }
            else if (foundKey3 && !this.greenKey) {
                this.greenKey = true;
                this.rect3.destroy();
                this.keySound.play();
                this.flashing.stop();
                this.selectRect.destroy();
                //if found all the keys
                if (this.purpleKey && this.blueKey && this.greenKey) {
                    this.puzzleEnd.play();
                    this.add.particles('goldCoin', {
                        x: this.chest.x + 200,
                        y: this.chest.y,
                        angle: { min: 180, max: 360 },
                        speed: 400,
                        gravityY: -350,
                        lifespan: 5000,
                        quantity: 4,
                        scale: { min: 0.5, max: 1.5 }
                    });
                    this.add.particles('goldCoin', {
                        x: this.chest.x,
                        y: this.chest.y,
                        angle: { min: 180, max: 360 },
                        speed: 400,
                        gravityY: -350,
                        lifespan: 5000,
                        quantity: 4,
                        scale: { min: 0.5, max: 1.5 }
                    });
                    this.add.particles('goldCoin', {
                        x: this.chest.x - 200,
                        y: this.chest.y,
                        angle: { min: 180, max: 360 },
                        speed: 400,
                        gravityY: -350,
                        lifespan: 5000,
                        quantity: 4,
                        scale: { min: 0.5, max: 1.5 }
                    });
                    this.add.image(this.chest.x, this.chest.y + 128, 'openChest').setScale(1.5);
                    this.chest.destroy();

                    //add skip button
                    this.skipButton = this.add.text(width/1.2, height/1.2, 'SKIP', {
                        font: '40px TypeReg', fontStyle: 'underline',
                        fill: '#fff'
                    });
                    this.skipButton.setInteractive();
                    this.skipButton.on('pointerdown', () => {
                        this.completeLevel();
                    })
                    this.time.delayedCall(5000, () => {
                        this.completeLevel();
                    });
                }
            }
        }


    }

    completeLevel() {
        puzzle1Scene = false;
        //storing completion of level bool in local storage
        console.log(this.level);
        if (this.level === "level1") {
            console.log("completed level1");
            var l1Complete = true;
            localStorage.setItem("l1Complete", JSON.stringify(l1Complete));
        }
        if (this.level === "level2") {
            console.log("completed level2");
            var l2Complete = true;
            localStorage.setItem("l2Complete", JSON.stringify(l2Complete));
        }
        if (this.level === "level3") {
            console.log("completed level3");
            var l3Complete = true;
            localStorage.setItem("l3Complete", JSON.stringify(l3Complete));
        }
        this.scene.start('levelScene');
    }
}
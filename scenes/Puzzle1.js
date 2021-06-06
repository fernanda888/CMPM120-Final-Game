class Puzzle1 extends Phaser.Scene {
    constructor() {
        super('puzzle1Scene');
    }

    preload() {
        //set load path
        this.load.path = 'assets/';
        this.load.audio('tower', 'tower.mp3');
        //load sound
        this.load.audio('tower', 'tower.mp3');

        //load images
        this.load.image('blueTower', 'blueTower.png');
        this.load.image('purpleTower', 'purpleTower.png');
        this.load.image('greenTower', 'greenTower.png');
        this.load.image('keyRock', 'rock1.png');
        this.load.image('purpleKey', 'purpleKey.png');
        this.load.image('greenKey', 'greenKey.png');
        this.load.image('blueKey', 'blueKey.png');
        this.load.image('pad', 'TowerPad.png');

    }
    create(level) {
        //variables
        this.ACCELERATION = 5;
        this.MAX_X_VEL = 500;   // pixels/second
        this.MAX_Y_VEL = 5000;
        this.physics.world.gravity.y = 2600;
        this.spacebar = this.input.keyboard.addKey('SPACE');
        this.level = level;

        this.tower_sound = this.sound.add('tower', {
            mute: false,
            volume: .2,
        });

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setBackgroundColor('#D0D0D0')

        //add background
        // this.pad=this.add.image(width/2, height/2, 'pad');
        // this.pad.setScale(0.7);

        puzzle1Scene = true;

        //set up towers
        this.purpleTower = new Tower(this, this.player, "purple");
        this.towerSetUp(this.purpleTower, (width / 2 - 450), (height / 2));

        this.greenTower = new Tower(this, this.player, "green");
        this.towerSetUp(this.greenTower, (width / 2), (height / 2));

        this.blueTower = new Tower(this, this.player, "blue");
        this.towerSetUp(this.blueTower, (width / 2 + 450), (height / 2));



        this.purpleKey = false;
        this.blueKey = false;
        this.greenKey = false;

        this.add.rectangle(width / 2, height - 100, 148, 148, 0xffffff);
        this.add.triangle(width / 2 + 70, height - 100, 50, 100, 100, 50, 50, 0, 0x000000);
        this.add.triangle(width / 2 - 70, height - 100, 50, 100, 100, 50, 50, 0, 0x000000).setRotation(3.15);
        if (foundKey1) {
            this.displayKey = this.add.image(width / 2, height - 100, 'purpleKey').setScale(.3).setScrollFactor(0);
            this.purpleKey = true;
            this.blueKey = false;
            this.greenKey = false;
        }
        else if (foundKey2) {
            this.displayKey = this.add.image(width / 2, height - 100, 'greenKey').setScale(.3).setScrollFactor(0);
            this.purpleKey = false;
            this.blueKey = false;
            this.greenKey = true;
        }
        else if (foundKey3) {
            this.displayKey = this.add.image(width / 2, height - 100, 'blueKey').setScale(.3).setScrollFactor(0);
            this.purpleKey = false;
            this.blueKey = true;
            this.greenKey = false;
        }



    }
    towerSetUp(tower, x, y) {
        tower.setScale(1.5);
        tower.x = x;
        tower.y = y;
        tower.alpha = .4;
    }
    update() {
        if (cursors.left.isDown) {
            if (this.purpleKey && foundKey3) {
                this.purpleKey = false;
                this.blueKey = true;
                this.displayKey = this.add.image(width / 2, height - 100, 'blueKey').setScale(.3).setScrollFactor(0);
            }
            else if (this.blueKey && foundKey2) {
                this.blueKey = false;
                this.greenKey = true;

                this.displayKey = this.add.image(width / 2, height - 100, 'greenKey').setScale(.3).setScrollFactor(0);
            }
            else if (this.greenKey && foundKey1) {
                this.greenKey = false;
                this.purpleKey = true;

                this.displayKey = this.add.image(width / 2, height - 100, 'purpleKey').setScale(.3).setScrollFactor(0);
            }

        }
        else if (cursors.right.isDown) {  //right arrow key down
            if (this.purpleKey && foundKey2) {
                this.purpleKey = false;
                this.greenKey = true;

                this.displayKey = this.add.image(width / 2, height - 100, 'greenKey').setScale(.3).setScrollFactor(0);
            }
            else if (this.greenKey && foundKey3) {
                this.greenKey = false;
                this.blueKey = true;

                this.displayKey = this.add.image(width / 2, height - 100, 'blueKey').setScale(.3).setScrollFactor(0);
            }
            else if (this.blueKey && foundKey2) {
                this.blueKey = false;
                this.purpleKey = true;
                this.displayKey = this.add.image(width / 2, height - 100, 'purpleKey').setScale(.3).setScrollFactor(0);
            }
        }

        else if (this.spacebar.isDown) { //spacebar key down
            if (this.purpleKey) {
                this.tower_sound.play();
                this.purpleTower.alpha = 1;
                this.purpleDone = true;
            }
            else if (this.greenKey) {
                this.tower_sound.play();
                this.greenTower.alpha = 1;
                this.greenDone = true;
            }
            else if (this.blueKey) {
                this.tower_sound.play();
                this.blueTower.alpha = 1
                this.blueDone = true;
            }

        }

        if (this.purpleDone && this.greenDone && this.blueDone) {
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
}
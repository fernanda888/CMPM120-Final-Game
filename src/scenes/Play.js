class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        //set load path
        this.load.path = 'assets/';

        //load sound
        this.load.audio('jumping', 'jumping.mp3');
        this.load.audio('walking', 'walking_sound.mp3');
        this.load.audio('tower', 'tower.mp3');

        //load images
        this.load.image('character', 'character.png');
        this.load.image('tower', 'tower.png');
        this.load.image('l1enemy', 'enemy_l1.jpeg');

        //load the json images 
        this.load.image('tiles', 'rockSheet.png');
        this.load.tilemapTiledJSON("tilemapJSON", "tileTest.json");

    }

    create() {
        //variables
        this.ACCELERATION = 1500;
        this.MAX_X_VEL = 500;   // pixels/second
        this.MAX_Y_VEL = 5000;
        this.DRAG = 600;    // DRAG < ACCELERATION = icy slide
        this.MAX_JUMPS = 2; // change for double/triple/etc. jumps 🤾‍♀️
        this.JUMP_VELOCITY = -700;
        this.physics.world.gravity.y = 2600;
        this.spacebar = this.input.keyboard.addKey('SPACE');

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        this.addSounds();
        this.addCharacter();
        this.addBackgroundTileMap();
        this.addInstructions();
        this.spawnL1Enemies();
        this.addColliders();
        this.addCamera();
    }

    addBackgroundTileMap() {
        //add the tilemap format to the scene
        const map = this.add.tilemap('tilemapJSON');
        const tileset = map.addTilesetImage('rockSheet', 'tiles');
        const bgLayer = map.createLayer('background', tileset, 0, 0);
        this.terrainLayer = map.createLayer('tiles', tileset, 0, 0);
        this.terrainLayer.setCollisionByProperty({
            collides: true
        });
    }

    addSounds() {
        //set up sounds
        this.walking_sound = this.sound.add('walking', {
            mute: false,
            loop: true,
            rate: 4,
            volume: .05
        });
        this.jumping_sound = this.sound.add('jumping', {
            mute: false,
            volume: .2,
        });
        this.tower_sound = this.sound.add('tower', {
            mute: false,
            volume: .2,
        });
    }

    addInstructions() {
        this.add.text(200, 500, 'Instructions: use right and left arrow keys to' +
            ' move and the up arrow key to jump. Use the spacebar to build ' +
            'towers to reach greater heights!', {
            fontFamily: 'Courier', fontSize: '20px',
            color: '#fff', lineSpacing: 10, wordWrap: { width: width / 3, },
        });
    }

    addCharacter() {
        this.player = new Player(this, this.MAX_X_VEL, this.MAX_Y_VEL);
    }

    addColliders() {
        if (!this.player.destroyed) {
            this.physics.add.collider(this.player, this.terrainLayer);
            this.physics.add.collider(this.player, this.l1EnemyGroup, () => {
                this.player.destroyed = true;
                this.player.destroy();
                this.jumping_sound.destroy();
                this.walking_sound.destroy();
                console.log("player destroyed");
                //change scene to end game
                this.scene.start('endScreen');
            });

            this.physics.add.collider(this.terrainLayer, this.l1EnemyGroup);
        }

    }

    spawnL1Enemies() {
        //set up L1 enemy group
        this.l1EnemyGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });

        //wait before spawning
        console.log("adding enemies");
        this.addL1Enemy();
    }

    addL1Enemy() {
        let speedVariance = Phaser.Math.Between(10, 13);
        if (!this.jumping) {
            this.time.delayedCall(3000, () => {
                console.log("adding level 1 enemy:");
                let enemy = new L1Enemy(this, -100 - speedVariance, this.player);
                this.l1EnemyGroup.add(enemy);
            });
        }

    }

    addCamera() {
        this.cameras.main.setBounds(0, 0, width, height);
        this.cameras.main.startFollow(this.player, true);
        this.cameras.main.setZoom(1.7);
    }

    update() {
        this.playSounds();
        this.keyDetection();
        this.jumpingLogic();
        this.cameraMovement();
    }

    //logic for keys pressed
    keyDetection() {
        //left arrow key down
        if (!this.player.destroyed) {
            if (cursors.left.isDown) {
                this.player.body.setAccelerationX(-this.ACCELERATION);
                playerWalking = true;
                this.player.setFlip(true, false);
                facingRight = false;
            } else if (cursors.right.isDown) {  //right arrow key down
                this.player.body.setAccelerationX(this.ACCELERATION);
                playerWalking = true;
                this.player.resetFlip();
                facingRight = true;
            } else if (this.spacebar.isDown) {    //spacebar key down
                this.tower_sound.play();
                if (towerExists == true) {
                    this.tower.destroy();
                }
                this.buildTower();
            } else {
                //set acceleration to 0 so drag will take over
                this.player.body.setAccelerationX(0);
                this.walking_sound.stop();
                playerWalking = false;
                this.player.body.setDragX(this.DRAG);
            }
        }

    }

    playSounds() {
        if (cursors.left.isDown && playerWalking == false) {
            this.walking_sound.play();
        }
        if (cursors.right.isDown && playerWalking == false) {
            this.walking_sound.play();
        }
    }

    //jump logic for player
    jumpingLogic() {
        if (!this.player.destroyed) {
            this.player.isGrounded = this.player.body.blocked.down;
            if (this.player.isGrounded) {
                this.jumps = this.MAX_JUMPS;
                this.jumping = false;
            }
    
            // allow steady velocity change up to a certain key down duration
            // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.DownDuration__anchor
            if (this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.up, 250)) {
                this.player.body.velocity.y = this.JUMP_VELOCITY;
                this.jumping = true;
                this.jumping_sound.play();
            }
            // finally, letting go of the UP key subtracts a jump
            // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.UpDuration__anchor
            if (this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.up)) {
                this.jumps--;
                this.jumping = false;
            }
        }
        
       
    }
    cameraMovement() {
        this.cam = this.cameras.main;
        if (moveCam) {
            if (this.cursors.left.isDown) {
                this.cam.scrollX -= 5;
            }
            else if (this.cursors.right.isDow) {
                this.cam.scrollX += 5;
            }
            else if (this.spacebar.isDown) {
                this.cam.scrollY += 10;
            }
        }
    }

    buildTower() {

        if (!this.player.destroyed) {
            this.tower = new Tower(this, this.player);
            towerExists = true;
            this.physics.add.collider(this.tower, this.player);
            this.physics.add.overlap(this.l1EnemyGroup, this.tower, (enemy) => {
                enemy.destroy();
            });
        }

    }
}
class Play3 extends Phaser.Scene {
    constructor(){
        super('play3Scene');
    }

    create() {
        //variables
        this.ACCELERATION = 1500;
        this.MAX_X_VEL = 300;   // pixels/second
        this.MAX_Y_VEL = 5000;
        this.DRAG = 1500;    // DRAG < ACCELERATION = icy slide
        this.MAX_JUMPS = 1; // change for double/triple/etc. jumps 🤾‍♀️
        this.MAX_TOW = 1;
        this.JUMP_VELOCITY = -700;
        this.physics.world.gravity.y = 1600;
        this.spacebar = this.input.keyboard.addKey('SPACE');
        this.foundKey1 = false;
        this.foundKey2 = false;
        this.foundKey3 = false;
        this.currentTowers = 0;

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

         //DELETE this once we have real door
         //this.addSounds();
         this.addBackgroundTileMap();
        // this.addCrackedTiles();
        // this.addCharacter();
        // this.addAnimation();
        // this.addSprites();
        // this.addBorder();
        // this.addDoor();
        // this.spawnL2Enemies();
        // this.addBlocks();
        // this.addColliders();
        // this.addCamera();
         //this.worldBounds();
 
    }
    addAnimation() {
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('charRun', { start: 0, end: 7, first: 0 }),
            frameRate: 12
        });
        this.anims.create({
            key: 'build',
            frames: this.anims.generateFrameNumbers('charTower', { start: 0, end: 5, first: 0 }),
            frameRate: 12
        });
    }

    addBackgroundTileMap() {
        //add the tilemap format to the scene
        this.map = this.add.tilemap('tilemap3JSON');
        const tileset = this.map.addTilesetImage('levelTwoRocksheet', 'tiles2');
        this.bgLayer = this.map.createLayer('background', tileset, 0, 0);
        this.terrainLayer = this.map.createLayer('tiles', tileset, 0, 0);
        //this.addKeys();
    }

    addCrackedTiles() {
        this.keyTiles = this.map.createFromTiles([16], 10, {
            key: "rock"
        });
        this.keyTiles.forEach(function (element) {
            element.x += 25;
            element.y += 25
        });
        this.terrainGroup = this.add.group(this.keyTiles);

        this.physics.world.enable(this.terrainGroup, Phaser.Physics.Arcade.STATIC_BODY);
        this.terrainLayer.setCollisionByProperty({
            collides: true
        });
    }

    addDoor() {
        const doorSpawn = this.map.findObject('Spawn', obj => obj.name === 'doorSpawn');
        this.door = this.physics.add.sprite(doorSpawn.x, doorSpawn.y, 'chest');
        this.door.body.allowGravity = false;
        this.door.body.immovable = true;
        this.door.body.moves = false;
        this.door.setScale(0.1);
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

    addCharacter() {
        this.p1Spawn = this.map.findObject('Spawn', obj => obj.name === 'p1Spawn');
        this.player = new Player(this, this.p1Spawn.x, this.p1Spawn.y);
        this.player.body.setSize(300, 600, 25, 50);
    }

    addCamera() {
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25);
        this.cameras.main.setZoom(1.5);
    }

    worldBounds() {
        this.physics.world.bounds.setTo(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    }

    addSprites() {

        //add key and tower frames 
        this.add.image(width / 4, height / 4.5, 'towerFrame').setScale(0.20).setScrollFactor(0);
        this.add.image(width / 1.3, height / 4.55, 'keyFrame').setScale(0.20).setScrollFactor(0);

        //add key and tower indicators 
        this.topTower = this.add.image(width / 4.3, height / 4.5, 'tower').setScale(0.10).setScrollFactor(0);
        this.topkey1 = this.add.image(width / 1.3 - 50, height / 4.55, 'purpleKey').setScale(0.15).setScrollFactor(0);
        this.topkey1.alpha = .5;
        this.topkey2 = this.add.image(width / 1.3, height / 4.55, 'greenKey').setScale(0.15).setScrollFactor(0);
        this.topkey2.alpha = .5;
        this.topkey3 = this.add.image(width / 1.3 + 50, height / 4.55, 'blueKey').setScale(0.15).setScrollFactor(0);
        this.topkey3.alpha = .5;
        //add key sprites
        const key1Spawn = this.map.findObject('Spawn', obj => obj.name === 'key1Spawn');
        this.key1 = this.physics.add.sprite(key1Spawn.x, key1Spawn.y, 'purpleKey').setScale(0.2);
        this.key1.body.allowGravity = false;
        this.physics.add.overlap(this.key1, this.player, () => {
            foundKey1 = true;
            this.topkey1.alpha = 1;
            this.key1.destroy();
        });

        const key2Spawn = this.map.findObject('Spawn', obj => obj.name === 'key2Spawn');
        this.key2 = this.physics.add.sprite(key2Spawn.x, key2Spawn.y, 'greenKey').setScale(0.2);
        this.key2.body.allowGravity = false;
        this.physics.add.overlap(this.key2, this.player, () => {
            foundKey2 = true;
            this.topkey2.alpha = 1;
            this.key2.destroy();
        });

        const key3Spawn = this.map.findObject('Spawn', obj => obj.name === 'key3Spawn');
        this.key3 = this.physics.add.sprite(key3Spawn.x, key3Spawn.y, 'blueKey').setScale(0.2);
        this.key3.body.allowGravity = false;
        this.physics.add.overlap(this.key3, this.player, () => {
            foundKey3 = true;
            this.topkey3.alpha = 1;
            this.key3.destroy();
        });
        //add towers group
        this.towers = this.add.group({
        });

        this.towerExists = this.MAX_TOW;
        //add powerUP
        const PUspawn = this.map.findObject('Spawn', obj => obj.name === 'powerUp');
        this.powerUp = this.physics.add.sprite(PUspawn.x, PUspawn.y, 'powerUp').setScale(0.05);
        this.powerUp.body.allowGravity = false;
        this.physics.add.overlap(this.powerUp, this.player, () => {
            this.powerUp.destroy();
            this.MAX_TOW = 2;
            this.topTower2 = this.add.image(width / 3.8, height / 4.5, 'tower').setScale(0.10).setScrollFactor(0);
        });
    }

    
    //add invisible sprites at each enemy positions
    // so enemies don't fall off platform
    addBlocks() {
        this.borderGroup = this.add.group({
        });

        this.border1 = this.addBlock(1205, 3367);
        this.borderGroup.add(this.border1);

        this.border2 = this.addBlock(1148, 867);
        this.borderGroup.add(this.border2);

        this.border3 = this.addBlock(1303, 1867);
        this.borderGroup.add(this.border3);

        // this.border4 = this.addBlock(995, 4470);
        // this.borderGroup.add(this.border4);

    }

    addBlock(locX, locY) {
        //add border
        let border = this.physics.add.sprite(locX,
            locY, 'border').setOrigin(SCALE).setScale(0.1, 2);
        border.setVisible(false);
        border.setImmovable(true);
        border.body.allowGravity = false;
        border.body.checkCollision.left = true;
        border.body.checkCollision.right = true;
        return border;
    }
    spawnL2Enemies() {
        //set up L1 enemy group
        this.l2EnemyGroup = this.add.group({
        });

        //wait before spawning
        console.log("adding enemies");
        this.addL2Enemy();
    }
    addL2Enemy() {
        let speedVariance = Phaser.Math.Between(10, 13);
        //get enemy spawn positions from tilemap
        this.enemy1Spawn = this.map.findObject('Spawn', obj => obj.name === 'flyingEnemy1');
        this.enemy2Spawn = this.map.findObject('Spawn', obj => obj.name === 'flyingEnemy2');
        this.enemy3Spawn = this.map.findObject('Spawn', obj => obj.name === 'flyingEnemy3');
        this.enemy4Spawn = this.map.findObject('Spawn', obj => obj.name === 'flyingEnemy4');

        if (!this.jumping) {
            console.log("adding level 1 enemy:");
            let enemy1 = new L1Enemy(this, -100 - speedVariance, this.enemy1Spawn.x, this.enemy1Spawn.y);
            enemy1.name = "enemy1";
            this.l2EnemyGroup.add(enemy1);

            let enemy2 = new L1Enemy(this, -100 - speedVariance, this.enemy2Spawn.x, this.enemy2Spawn.y);
            enemy2.name = "enemy2";
            this.l2EnemyGroup.add(enemy2);

            let enemy3 = new L1Enemy(this, -100 - speedVariance, this.enemy3Spawn.x, this.enemy3Spawn.y);
            enemy3.name = "enemy3";
            //console.log("enemy 3: ", enemy3);
            this.l2EnemyGroup.add(enemy3);

            let enemy4 = new L1Enemy(this, -100 - speedVariance, this.enemy4Spawn.x, this.enemy4Spawn.y);
            enemy4.name = "enemy4";
            this.l2EnemyGroup.add(enemy4);

        }

    }

    changeEnemyDirection(enemy) {
        //check if blocked on the right, then enemy should move left
        if (enemy.body.blocked.right) {
            enemy.direction = 'LEFT';
            enemy.resetFlip();
            if (enemy.name === 'enemy5') {
                console.log("flipping enemy blocked right: ", enemy.flipX);
            }

        }

        //check if blocked on the left, then enemy should move right
        else if (enemy.body.blocked.left) {
            enemy.direction = 'RIGHT';
            enemy.flipX = true;
            if (enemy.name === 'enemy5') {
                console.log("flipping enemy blocked left: ", enemy.flipX);
            }
        }

        // console.log(enemy);
        if (enemy.direction === 'RIGHT') {
            enemy.body.velocity.x = 100;
        } else {
            enemy.body.velocity.x = -100;
        }
    }

    addBorder() { //adding border bc fall is too high
        const key2Spawn = this.map.findObject('Spawn', obj => obj.name === 'key2Spawn');
        this.borderH = this.physics.add.sprite(key2Spawn.x + 100, key2Spawn.y + 80, 'borderH').setScale(0.5);
        this.borderH.setVisible(false);
        this.borderH.setImmovable(true);
        this.borderH.body.allowGravity = false;
        this.borderH.body.checkCollision.up = true;
    }

    addColliders() {
        if (!this.player.destroyed) {
            this.physics.add.collider(this.door, this.terrainLayer);
            this.physics.add.collider(this.player, this.terrainLayer);
            this.physics.add.collider(this.player, this.terrainGroup);
            this.physics.add.collider(this.player, this.borderH);
            this.physics.add.collider(this.player, this.door, () => {
                this.player.destroyed = true;
                this.player.destroy();
                this.jumping_sound.destroy();
                this.walking_sound.destroy();
                console.log("player finished");
                this.currentTowers = 0;
                this.scene.start('puzzle1Scene');
            });

            this.physics.add.collider(this.door, this.l1EnemyGroup,
                (enemy, border) => {
                    this.changeEnemyDirection(enemy);
                });

            this.physics.add.collider(this.terrainLayer, this.l2EnemyGroup,
                (enemy, border) => {
                    this.changeEnemyDirection(enemy);
                });
            this.physics.add.collider(this.l2EnemyGroup, this.borderGroup,
                (enemy, border) => {
                    this.changeEnemyDirection(enemy);
                });
            this.physics.add.collider(this.l2EnemyGroup, this.terrainGroup,
                (enemy, border) => {
                    //console.log("terrain group: ", enemy.name);
                    this.changeEnemyDirection(enemy);

                });

            this.physics.add.collider(this.player, this.l2EnemyGroup, () => {
                this.player.destroyed = true;
                this.player.destroy();
                this.jumping_sound.destroy();
                this.walking_sound.destroy();
                console.log("player destroyed");
                //change scene to end game
                this.scene.start('endScreen');
            });

        }

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
            } else if (!this.spacebar.isDown && !cursors.down.isDown) {
                //set acceleration to 0 so drag will take over
                this.player.body.setAccelerationX(0);
                this.walking_sound.stop();
                playerWalking = false;
                this.player.body.setDragX(this.DRAG);
            }
            if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {    //spacebar key down
                if (this.currentTowers == this.MAX_TOW) {
                    this.towers.clear(true, true);
                    this.currentTowers = 0;
                }
                this.player.anims.play('build');
                this.buildTower();
                if (this.topTower.alpha == 1) {
                    this.topTower.alpha = .5;
                }
                else if (this.MAX_TOW == 2) {
                    this.topTower2.alpha = .5;
                }
                this.currentTowers++;
            }
            if (Phaser.Input.Keyboard.JustDown(cursors.down)) {  //right arrow key down
                if (this.currentTowers > 0) {
                    var destroyTow = this.towers.getFirstAlive();
                    destroyTow.destroy();
                    this.currentTowers--;
                    if (this.topTower.alpha == .5) {
                        this.topTower.alpha = 1;
                    }
                    else if (this.MAX_TOW == 2) {
                        this.topTower2.alpha = 1;
                    }
                }
            }

            if (playerWalking && this.player.body.blocked.down) {
                this.player.anims.play('run', true);
            } else if (!playerWalking && this.player.body.blocked.down) {
                this.player.setTexture('character');
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
            console.log("player's position: ", this.player.x, ": ", this.player.y);
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
                this.player.setTexture('characterJump');
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
            this.player.anims.play('build');
            let tower = new Tower(this, this.player, "red");
            this.towers.add(tower);
            this.tower_sound.play();
            this.physics.add.collider(this.towers, this.terrainLayer);
            this.physics.add.collider(this.towers, this.towers);
            this.physics.add.collider(this.towers, this.player);
            this.physics.add.collider(this.towers, this.terrainGroup, (obj1, obj2) => {
                console.log("destroying cracked tiles");
                obj2.destroy();
            });
            this.physics.add.overlap(this.l2EnemyGroup, this.towers, (enemy) => {
                enemy.destroy();
            });
        }
    }

}
class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        //variables
        level1=true;
        this.ACCELERATION = 1500;
        this.MAX_X_VEL = 300;   // pixels/second
        this.MAX_Y_VEL = 5000;
        this.DRAG = 1500;    // DRAG < ACCELERATION = icy slide
        this.MAX_JUMPS = 1; // change for double/triple/etc. jumps 🤾‍♀️
        this.MAX_TOW=1;
        this.JUMP_VELOCITY = -700;
        this.physics.world.gravity.y = 1600;
        this.spacebar = this.input.keyboard.addKey('SPACE');
        foundKey1 = false;
        foundKey2 = false;
        foundKey3 = false;
        this.currentTowers=0;

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        //DELETE this once we have real door
        this.addSounds();
        this.addBackgroundTileMap();
        this.addCrackedTiles();
        this.addCharacter();
        this.addAnimation();
        this.addSprites();
        this.addDoor();
        this.addInstructions();
        this.addBlocks();
        this.spawnL1Enemies();
        this.addColliders();
        this.addCamera();
        this.worldBounds();

    }

    //add invisible sprites at each enemy positions
    // so enemies don't fall off platform
    addBlocks() {
        this.borderGroup = this.add.group({
        });

        this.border1 = this.addBlock(350, 3018);
        this.borderGroup.add(this.border1);

        this.border2 = this.addBlock(250, 3670);
        this.borderGroup.add(this.border2);

        this.border3 = this.addBlock(509, 2720);
        this.borderGroup.add(this.border3);

        this.border6 = this.addBlock(953, 2720);
        this.borderGroup.add(this.border6);

        this.border4 = this.addBlock(995, 4470);
        this.borderGroup.add(this.border4);

        this.border5 = this.addBlock(500, 4770);
        this.borderGroup.add(this.border5);

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
    addAnimation(){
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
        this.anims.create({
            key: 'crawl',
            frames: this.anims.generateFrameNumbers('l1enemy', { start: 0, end: 4, first: 0 }),
            frameRate: 10
        });
    }

    addBackgroundTileMap() {
        //add the tilemap format to the scene
        this.map = this.add.tilemap('tilemapJSON');
        const tileset = this.map.addTilesetImage('rockSheet', 'tiles');
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
        this.door.body.allowGravity = true;
        this.door.body.pushable = false;
        this.door.setScale(0.1);
    }

    addSounds() {
        // set up music
        
         //set up sounds
         this.walking_sound = this.sound.add('walking', {
            mute: false,
            loop: true,
            rate: 7,
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
        this.tile_sound = this.sound.add('tileBreak', {
            mute: false,
            volume: .4,
        });
        this.enemy_kill = this.sound.add('enemyKill', {
            mute: false,
            volume: .4,
        });
        this.key_sound = this.sound.add('keySound', {
            mute: false,
            volume: .2,
        });
        this.songL1 = this.sound.add('musicL1', { 
            mute: false,
            loop: true,
            rate: 1.05,
            volume: 0.05
        });
        this.songL1.play();
    }

    addInstructions() {
        this.add.image(130, 4600, 'scroll1').setScale(.75).setOrigin(0,0);
        this.add.image(600, 4500, 'scroll2').setScale(.75).setOrigin(0,0);
        this.add.image(1000, 4250, 'scroll3').setScale(.75).setOrigin(0,0);
        this.add.image(580, 4000, 'scroll5').setScale(.75).setOrigin(0,0);
        this.add.image(1066, 2550, 'scroll4').setScale(.75).setOrigin(0,0);
    }

    addCharacter() {
        this.p1Spawn = this.map.findObject('Spawn', obj => obj.name === 'p1Spawn');

        this.player = new Player(this, this.p1Spawn.x, this.p1Spawn.y);
        this.player.body.setSize(300, 600,25,50);
        this.player.body.setMaxVelocityY(1000);

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

         //add animations for the enemies
         if (enemy.direction === 'RIGHT') {
            enemy.body.velocity.x = 100;
        } else {
            enemy.body.velocity.x = -100;
        }
        if(enemy.fly == false){
            enemy.anims.play('crawl', true);
        }
    }

    addSprites(){
        //add key and tower frames 
        this.add.image(width/4, height/4.5, 'towerFrame').setScale(0.20).setScrollFactor(0);
        this.add.image(width/1.3, height/4.55, 'keyFrame').setScale(0.20).setScrollFactor(0);
        //add key and tower indicators 
        this.topTower=this.add.image(width/4.03, height/4.5, 'tower').setScale(0.10).setScrollFactor(0);
        this.topkey1=this.add.image(width/1.3-50, height/4.55, 'purpleKey').setScale(0.15).setScrollFactor(0);
        this.topkey1.alpha=.5;
        this.topkey2=this.add.image(width/1.3, height/4.55, 'greenKey').setScale(0.15).setScrollFactor(0);
        this.topkey2.alpha=.5;
        this.topkey3=this.add.image(width/1.3+50, height/4.55, 'blueKey').setScale(0.15).setScrollFactor(0);
        this.topkey3.alpha=.5;
        //add key sprites
        const key1Spawn=this.map.findObject('Spawn',obj=>obj.name==='key1Spawn');
        this.key1 = this.physics.add.sprite(key1Spawn.x, key1Spawn.y, 'purpleKey').setScale(0.2);
        this.key1.body.allowGravity=false;
        this.physics.add.overlap(this.key1, this.player, ()=> {
            foundKey1=true;
            this.topkey1.alpha=1;
            this.key_sound.play();
            this.key1.destroy();
        });

        const key2Spawn=this.map.findObject('Spawn',obj=>obj.name==='key2Spawn');
        this.key2 = this.physics.add.sprite(key2Spawn.x, key2Spawn.y, 'greenKey').setScale(0.2);
        this.key2.body.allowGravity=false;
        this.physics.add.overlap(this.key2, this.player, ()=> {
            foundKey2=true;
            this.topkey2.alpha=1;
            this.key_sound.play();
            this.key2.destroy();
        });
        

        const key3Spawn=this.map.findObject('Spawn',obj=>obj.name==='key3Spawn');
        this.key3 = this.physics.add.sprite(key3Spawn.x, key3Spawn.y, 'blueKey').setScale(0.2);
        this.key3.body.allowGravity=false;
        this.physics.add.overlap(this.key3, this.player, ()=> {
            foundKey3=true;
            this.topkey3.alpha=1;
            this.key_sound.play();
            this.key3.destroy();
        });
        //add towers group
        this.towers = this.add.group({
        });

        this.towerExists=this.MAX_TOW;
         //add powerUP
    }
    addColliders() {
        if (!this.player.destroyed) {
            this.physics.add.collider(this.door, this.terrainLayer);
            this.physics.add.collider(this.player, this.terrainLayer);
            this.physics.add.collider(this.player, this.terrainGroup);

            this.physics.add.collider(this.door, this.l1EnemyGroup,
                (enemy, border) => {
                    this.changeEnemyDirection(enemy);
                });
            this.physics.add.collider(this.terrainLayer, this.l1EnemyGroup,
                (enemy, border) => {
                    this.changeEnemyDirection(enemy);
                });
            this.physics.add.collider(this.l1EnemyGroup, this.terrainGroup,
                (enemy, border) => {
                    //console.log("terrain group: ", enemy.name);
                    this.changeEnemyDirection(enemy);
                    
                });
            this.physics.add.collider(this.l1EnemyGroup, this.borderGroup,
                (enemy, border) => {
                    this.changeEnemyDirection(enemy);
                });
            this.physics.add.collider(this.player, this.l1EnemyGroup, () => {
                this.sound.removeAll();
                this.player.destroyed = true;
                this.player.destroy();
                console.log("player destroyed");
                //change scene to end game
                this.scene.start('endScreen', "playScene");
            });

            this.physics.add.collider(this.player, this.door, () => {
                if(foundKey1 && foundKey2 && foundKey3){
                    this.player.destroyed = true;
                    this.sound.removeAll();
                    this.player.destroy();
                    console.log("player finished");
                    this.currentTowers=0;
                    this.scene.start('puzzle1Scene', "level1");
                }
            });

        }

    }

    spawnL1Enemies() {
        //set up L1 enemy group
        this.l1EnemyGroup = this.add.group({
        });

        //wait before spawning
        console.log("adding enemies");
        this.addL1Enemy();
    }

    addL1Enemy() {
        let speedVariance = Phaser.Math.Between(10, 13);
        if (!this.jumping) {
            console.log("adding level 1 enemy:");
            let enemy1 = new L1Enemy(this, -100 - speedVariance, 630, 4770);
            enemy1.name = "enemy1";
            this.l1EnemyGroup.add(enemy1);

            let enemy2 = new L1Enemy(this, -100 - speedVariance, 1429, 4320);
            enemy2.name = "enemy2";
            this.l1EnemyGroup.add(enemy2);

            let enemy3 = new L1Enemy(this, -100 - speedVariance, 816, 4070);
            enemy3.name = "enemy3";
            //console.log("enemy 3: ", enemy3);
            this.l1EnemyGroup.add(enemy3);

            let enemy4 = new L1Enemy(this, -100 - speedVariance, 1404, 3670);
            enemy4.name = "enemy4";
            this.l1EnemyGroup.add(enemy4);

            let enemy5 = new L1Enemy(this, -100 - speedVariance, 1375, 3020);
            enemy5.name = "enemy5";
            this.l1EnemyGroup.add(enemy5);

            let enemy6 = new L1Enemy(this, -100 - speedVariance, 641, 2720);
            enemy6.name = "enemy6";
            this.l1EnemyGroup.add(enemy6);

        }

    }

    addCamera() {
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25);
        this.cameras.main.setZoom(1.5);
    }
    worldBounds() {
        this.physics.world.bounds.setTo(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    }


    update() {
        if (!this.player.destroyed){
            this.playSounds();
            this.keyDetection();
            this.jumpingLogic();
            this.cameraMovement();
        }

    }

    //logic for keys pressed
    keyDetection() {
        //left arrow key down
            if (cursors.left.isDown) {
                this.player.body.setAccelerationX(-this.ACCELERATION);
                playerWalking = true;
                this.player.setFlip(true, false);
                facingRight = false;
                this.building=false;
            } else if (cursors.right.isDown) {  //right arrow key down
                this.player.body.setAccelerationX(this.ACCELERATION);
                playerWalking = true;
                this.player.resetFlip();
                facingRight = true;
                this.building=false;
            }  else if (!this.spacebar.isDown && !cursors.down.isDown){
                //set acceleration to 0 so drag will take over
                this.player.body.setAccelerationX(0);
                this.walking_sound.stop();
                playerWalking = false;
                this.player.body.setDragX(this.DRAG);
                this.building=false;
            }
            if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {    //spacebar key down
                this.building=true;
                if(this.currentTowers==this.MAX_TOW){
                    this.towers.clear(true,true);
                    this.currentTowers=0;
                }
                this.player.anims.play('build');
                this.buildTower();
                this.topTower.alpha=.5;
                this.currentTowers++;
            }
            if (cursors.down.isDown) {  //right arrow key down
                if(this.currentTowers>0){
                    var destroyTow=this.towers.getFirstAlive();
                    destroyTow.destroy();
                    this.currentTowers--;
                    this.topTower.alpha=1;
                }
                this.building=false;
            }
            
            if(playerWalking && this.player.body.blocked.down){
                this.player.anims.play('run', true);
            } else if(!playerWalking && this.player.body.blocked.down && !this.building){
                this.player.setTexture('character');
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
            // console.log("player's position: ", this.player.x, ": ", this.player.y);
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
                this.building=false;
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
            let tower = new Tower(this, this.player,"red");
            this.towers.add(tower);
            this.tower_sound.play();
            this.physics.add.collider(this.towers, this.terrainLayer);
            this.physics.add.collider(this.towers, this.player);
            this.physics.add.overlap(this.l1EnemyGroup, this.towers, (enemy, tower) => {
                    console.log("squish enemy");
                    this.enemy_kill.play();
                    console.log(this.enemy_kill);
                    enemy.destroy();
                
            });
            this.physics.add.overlap(this.towers, this.terrainGroup, (obj1, obj2) => {
                console.log("destroying cracked tiles");
                this.tile_sound.play();
                obj2.destroy();
            });
        

    }
    enemyCollision(){
        this.song1.destroy();
    }
    
}
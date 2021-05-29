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
        this.load.image('door', 'door.jpeg');
        this.load.image('rock', 'rock2.png');
        this.load.image('keyRock', 'rock1.png');
        this.load.image('purpleKey', 'purpleKey.png');
        this.load.image('greenKey', 'greenKey.png');
        this.load.image('blueKey', 'blueKey.png');
        this.load.image('powerUp', 'powerUp.png');

        //load the json images 
        this.load.image('tiles', 'rockSheet.png');
        this.load.tilemapTiledJSON("tilemapJSON", "levelOne.json");

    }

    create() {
        //variables
        this.ACCELERATION = 1500;
        this.MAX_X_VEL = 300;   // pixels/second
        this.MAX_Y_VEL = 5000;
        this.DRAG = 1500;    // DRAG < ACCELERATION = icy slide
        this.MAX_JUMPS = 2; // change for double/triple/etc. jumps 🤾‍♀️
        this.MAX_TOW=1;
        this.JUMP_VELOCITY = -700;
        this.physics.world.gravity.y = 2600;
        this.spacebar = this.input.keyboard.addKey('SPACE');
        this.foundKey1=false;
        this.foundKey2=false;
        this.foundKey3=false;

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        //DELETE this once we have real door
        this.addSounds();
        this.addBackgroundTileMap();
        this.addCharacter();
        this.addSprites();
        this.addCrackedTiles();
        this.addDoor();
        this.addInstructions();
        this.spawnL1Enemies();
        this.addColliders();
        this.addCamera();
        this.worldBounds();
        
    }

    addBackgroundTileMap() {
        //add the tilemap format to the scene
        this.map = this.add.tilemap('tilemapJSON');
        const tileset = this.map.addTilesetImage('rockSheet', 'tiles');
        this.bgLayer = this.map.createLayer('background', tileset, 0, 0);
        this.terrainLayer = this.map.createLayer('tiles', tileset, 0, 0);
        
    }
    addCrackedTiles(){
        this.keyTiles=this.map.createFromTiles([5],10,{
            key:"rock"
        });
        this.keyTiles.forEach(function(element){
            element.x+=25;
            element.y+=25
        });
        this.terrainGroup=this.add.group(this.keyTiles);
        this.physics.world.enable(this.terrainGroup,Phaser.Physics.Arcade.STATIC_BODY);
        this.terrainLayer.setCollisionByProperty({
            collides: true
        });
    }
    addDoor(){
        const doorSpawn=this.map.findObject('Spawn',obj=>obj.name==='doorSpawn');
        this.door = this.physics.add.sprite(doorSpawn.x, doorSpawn.y, 'door');
        this.door.body.allowGravity = false;
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

    addInstructions() {
        this.add.text(200, 500, 'Instructions: use right and left arrow keys to' +
            ' move and the up arrow key to jump. Use the spacebar to build ' +
            'towers to reach greater heights!', {
            fontFamily: 'Courier', fontSize: '20px',
            color: '#fff', lineSpacing: 10, wordWrap: { width: width / 3, },
        });
    }

    addCharacter() {
        this.p1Spawn = this.map.findObject('Spawn', obj => obj.name === 'p1Spawn');
        this.player = new Player(this, this.p1Spawn.x, this.p1Spawn.y);
    }

    addSprites(){
        this.topkey1=this.add.image(width/2-50, height/4, 'purpleKey').setScale(0.09).setScrollFactor(0);
        this.topkey1.alpha=.5;
        this.topkey2=this.add.image(width/2, height/4, 'greenKey').setScale(0.09).setScrollFactor(0);
        this.topkey2.alpha=.5;
        this.topkey3=this.add.image(width/2+50, height/4, 'blueKey').setScale(0.09).setScrollFactor(0);
        this.topkey3.alpha=.5;

        const key1Spawn=this.map.findObject('Spawn',obj=>obj.name==='key1Spawn');
        this.key1 = this.physics.add.sprite(key1Spawn.x, key1Spawn.y, 'purpleKey').setScale(0.05);
        this.key1.body.allowGravity=false;
        this.physics.add.overlap(this.key1, this.player, ()=> {
            foundKey1=true;
            this.topkey1.alpha=1;
            this.key1.destroy();
        });

        const key2Spawn=this.map.findObject('Spawn',obj=>obj.name==='key2Spawn');
        this.key2 = this.physics.add.sprite(key2Spawn.x, key2Spawn.y, 'greenKey').setScale(0.05);
        this.key2.body.allowGravity=false;
        this.physics.add.overlap(this.key2, this.player, ()=> {
            foundKey2=true;
            this.topkey2.alpha=1;
            this.key2.destroy();
        });

        const key3Spawn=this.map.findObject('Spawn',obj=>obj.name==='key3Spawn');
        this.key3 = this.physics.add.sprite(key3Spawn.x, key3Spawn.y, 'blueKey').setScale(0.05);
        this.key3.body.allowGravity=false;
        this.physics.add.overlap(this.key3, this.player, ()=> {
            foundKey3=true;
            this.topkey3.alpha=1;
            this.key3.destroy();
        });

        //add towers group
        this.towers = this.add.group({
        });

        //add powerUP
        const PUspawn=this.map.findObject('Spawn',obj=>obj.name==='powerUp');
        this.powerUp = this.physics.add.sprite(PUspawn.x, PUspawn.y, 'powerUp').setScale(0.05);
        this.powerUp.body.allowGravity=false;
        this.physics.add.overlap(this.powerUp, this.player, ()=> {
            this.powerUp.destroy();
            this.MAX_TOW=2;
        });
    }

    addColliders() {
        if (!this.player.destroyed) {
            this.physics.add.collider(this.door, this.terrainLayer);
            this.physics.add.collider(this.player, this.terrainLayer);
            this.physics.add.collider(this.player, this.terrainGroup );
            this.physics.add.collider(this.l1EnemyGroup, this.terrainGroup);
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
            this.physics.add.collider(this.player, this.door, () => { 
                this.player.destroyed = true;
                this.player.destroy();
                this.jumping_sound.destroy();
                this.walking_sound.destroy();
                console.log("player finished"); 
                towerExists=false;  
                this.scene.start('puzzle1Scene');
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
            let enemy1 = new L1Enemy(this, -100 - speedVariance, width/2, this.p1Spawn.y - 50);
            this.l1EnemyGroup.add(enemy1);
            let enemy2 = new L1Enemy(this, -100 - speedVariance, width - 50, this.p1Spawn.y - 500);
            this.l1EnemyGroup.add(enemy2);
            let enemy3 = new L1Enemy(this, -100 - speedVariance, width/2, this.p1Spawn.y - 1600);
            this.l1EnemyGroup.add(enemy3);
        }

    }

    addCamera() {
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player, true,0.25,0.25,-75);
        this.cameras.main.setZoom(1.5);
    }
    worldBounds(){
        this.physics.world.bounds.setTo(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    }
    

    update() {
        this.playSounds();
        this.keyDetection();
        this.jumpingLogic();
        this.buildTower();
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
            } else if (cursors.down.isDown) {  //right arrow key down
                if(towerExists){
                    this.towers.clear(true,true);
                    this.towersLeft=this.MAX_TOW;
                }
            }else {
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
            if (this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.up, 200)) {
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
            if(!towerExists){
                this.towersLeft=this.MAX_TOW;
                this.building=false;
            }

            if(this.spacebar.isDown && !playerWalking && this.player.isGrounded){
                console.log(this.towersLeft);
                if (this.towersLeft<=0) {
                    this.towers.clear(true,true);
                    this.towersLeft=this.MAX_TOW;
                }
                let tower = new Tower(this, this.player,"red");
                this.towers.add(tower);
                towerExists = true;
                this.physics.add.collider(this.towers, this.player);
                this.physics.add.collider(this.towers,this.terrainLayer);
                this.physics.add.overlap(this.l1EnemyGroup, this.towers, (enemy) => {
                    enemy.destroy();
                });
                this.physics.add.overlap(this.towers,this.terrainGroup, (obj1,obj2)=>{
                    obj2.destroy();
                });
                this.tower_sound.play();
                this.building=true;
            }
            if(this.building  && Phaser.Input.Keyboard.UpDuration(this.spacebar)){
                this.towersLeft--;
                this.building=false;
            }

        }
    }
}

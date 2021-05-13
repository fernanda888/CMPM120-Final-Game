class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        //set load path
        this.load.path = 'assets/';

        //load images
        this.load.image('tile', 'dungeon_tile.png');
        this.load.image('door', 'door.jpeg');
        this.load.image('background', 'background.jpeg');
        this.load.image('character', 'character.png');
        this.load.image('tower', 'tower.jpeg');
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

        this.addBackground();
        this.makePlatforms();
        this.addCharacter();
        this.addColliders();
    }

    addBackground() {
        this.add.image(width, height, 'background');
    }

    makePlatforms() {
        //add platform tiles
        this.platforms = this.add.group();
        //ground
        for (let i = 0; i < width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i , height - tileSize * 1.5, 'tile')
            .setScale(SCALE, SCALE/4).setOrigin(0);
            groundTile.body.allowGravity = false;
            groundTile.body.setImmovable();
            this.platforms.add(groundTile);
        }

        //platform 1
        for(let i = tileSize*13; i < width-tileSize*8; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, height - tileSize*5, 'tile')
            .setScale(SCALE, SCALE/5).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.platforms.add(groundTile);
        }

        // //platform 2
        // for(let i = tileSize*2; i < width-tileSize*20; i += tileSize) {
        //     let groundTile = this.physics.add.sprite(i, height - tileSize*9, 'tile')
        //     .setScale(SCALE, SCALE/5).setOrigin(0);
        //     groundTile.body.immovable = true;
        //     groundTile.body.allowGravity = false;
        //     this.platforms.add(groundTile);
        // }

        //platform 3
        for(let i = tileSize*10; i < width-tileSize*13; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, height - tileSize*13, 'tile')
            .setScale(SCALE, SCALE/5).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.platforms.add(groundTile);
        }

        //door at top to next level
        let door = this.add.image(width/2 + 30, height - tileSize*13.9, 'door');
        door.setScale(0.1);
    }

    addCharacter() {
        this.player = new Player(this, this.MAX_X_VEL, this.MAX_Y_VEL);
    }

    addColliders() {
        this.physics.add.collider(this.player, this.platforms);
    }

    update() {
        //left arrow key down
        if (cursors.left.isDown) {
            this.player.body.setAccelerationX(-this.ACCELERATION);
        } else if (cursors.right.isDown) {
            this.player.body.setAccelerationX(this.ACCELERATION);
        } 
        else if(this.spacebar.isDown){
            this.buildTower(this.player);
        }
        else {
            //set acceleration to 0 so drag will take over
            this.player.body.setAccelerationX(0);
            this.player.body.setDragX(this.DRAG);
        }
        this.jumpingLogic();
    }

    //jump logic for player
    jumpingLogic() {
        this.player.isGrounded = this.player.body.touching.down;
        if(this.player.isGrounded) {
	    	this.jumps = this.MAX_JUMPS;
	    	this.jumping = false;
	    } else {
            console.log("not grounded");
        }

        // allow steady velocity change up to a certain key down duration
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.DownDuration__anchor
	    if(this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.up, 250)) {
            console.log("jump");
	        this.player.body.velocity.y = this.JUMP_VELOCITY;
	        this.jumping = true;
	    } else {
	    	console.log("not pressing up key");
	    }
        // finally, letting go of the UP key subtracts a jump
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.UpDuration__anchor
	    if(this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.up)) {
	    	this.jumps--;
	    	this.jumping = false;
	    }
    }
    buildTower(player){
        this.tower=this.physics.add.sprite(player.x+80,player.y+40,'tower');
        this.tower.body.immovable = true;
        this.tower.body.allowGravity = false;
        this.physics.add.collider(this.tower,player);
        this.physics.add.collider(this.platforms,this.tower);
    }
}
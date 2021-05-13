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

    }

    create() {
        this.addBackground();
        this.makePlatforms();
    }

    addBackground() {
        let background = this.add.image(width, height, 'background');
        
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

        //platform 2
        for(let i = tileSize*2; i < width-tileSize*20; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, height - tileSize*9, 'tile')
            .setScale(SCALE, SCALE/5).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.platforms.add(groundTile);
        }

        //platform 3
        for(let i = tileSize*10; i < width-tileSize*13; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, height - tileSize*13, 'tile')
            .setScale(SCALE, SCALE/5).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.platforms.add(groundTile);
        }

        let door = this.add.image(width/2 + 30, height - tileSize*13.9, 'door');
        door.setScale(0.1);
    }

    update() {

    }
}
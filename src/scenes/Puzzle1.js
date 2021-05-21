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
        this.load.image('tower', 'tower.png');
        this.load.image('pad', 'TowerPad.png');
    }
    create() {
        //variables
        this.ACCELERATION = 5;
        this.MAX_X_VEL = 500;   // pixels/second
        this.MAX_Y_VEL = 5000;
        this.physics.world.gravity.y = 2600;
        this.spacebar = this.input.keyboard.addKey('SPACE');
        
        this.tower_sound = this.sound.add('tower', {
            mute: false,
            volume: .2,
        });

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        //add background
        this.pad=this.add.image(width/2, height/2, 'pad');
        this.pad.setScale(0.7);
        puzzleScene=true;
        this.tower= new Tower (this, this.player);
        this.tower.alpha=0;
        
    }
    update(){
        if (towerExists && cursors.down.isDown ) {
            this.tower.y+=this.ACCELERATION
        } else if (cursors.up.isDown  && towerExists) {  //right arrow key down
            this.tower.y-=this.ACCELERATION
        } else if (this.spacebar.isDown) { //spacebar key down
            this.tower.alpha=1;
            towerExists=true;    
            this.tower_sound.play();
        } 
    }
}
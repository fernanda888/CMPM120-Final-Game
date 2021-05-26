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

        this.cameras.main.setBackgroundColor('#D0D0D0')

        //add background
        // this.pad=this.add.image(width/2, height/2, 'pad');
        // this.pad.setScale(0.7);
        puzzle1Scene=true;
        this.greenTower= new Tower (this, this.player);
        this.greenTower.setScale(1.5);
        this.greenTower.alpha=1;
        this.greenTower.setTint(0xff0000);

        this.purpleTower= new Tower (this, this.player);
        this.purpleTower.setScale(1.5);
        this.purpleTower.x=width/2 +450;
        this.purpleTower.y=height/2;
        this.purpleTower.alpha=.5;

        this.blueTower= new Tower (this, this.player);
        this.blueTower.setScale(1.5);
        this.blueTower.x=width/2 -450;
        this.blueTower.y=height/2;
        this.blueTower.alpha=.5;
        

        
    }
    update(){
        if (this.spacebar.isDown) { //spacebar key down
            this.tower.alpha=1;
            towerExists=true;    
            this.tower_sound.play();
        } 
    }
}
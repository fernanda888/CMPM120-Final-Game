class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocityX, velocityY) {
        // call Phaser Physics Sprite constructor
        super(scene, width/3, height/2, 'character'); 
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add to physics system
        this.setCollideWorldBounds(true); 
        this.setScale(0.15);
        this.setMaxVelocity(velocityX, velocityY);
        this.body.allowGravity=true;
        this.setPushable(false);
        this.setBounce(0.5);
        this.setDragY(200);
        this.setDepth(1);
        // this.body.checkCollision.down=true; 
        // this.body.checkCollision.left=true; 
        // this.body.checkCollision.right=true; 
        // this.body.checkCollision.up=true;             
        // this.newCheese = true;                 // custom property to control Trap spawning
    }

    update() {
              
    }
}
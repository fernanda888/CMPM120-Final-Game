class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocityX, velocityY) {
        // call Phaser Physics Sprite constructor
        super(scene, velocityX, velocityY, 'character'); 
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add to physics system
        this.setCollideWorldBounds(true); 
        this.setScale(0.1);
        this.setMaxVelocity(300, 5000);
        this.body.allowGravity=true;
        this.destroyed = false;
        this.setPushable(false);
        this.setBounce(0.2);
        this.setDragY(200);
        this.body.allowDrag=true;
        this.setDepth(1);
    }

    update() {
              
    }
}
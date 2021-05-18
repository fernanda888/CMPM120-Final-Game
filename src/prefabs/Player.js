class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocityX, velocityY) {
        // call Phaser Physics Sprite constructor
        super(scene, width/3, height - tileSize * 3, 'character'); 
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add to physics system
        this.setCollideWorldBounds(true); 
        this.setScale(0.1);
        this.setMaxVelocity(velocityX, velocityY);
        this.body.allowGravity=true;
        this.setPushable(false);
        this.setBounce(0.5);
        this.setDragY(200);
        this.setDepth(1);
    }

    update() {
              
    }
}
class L2Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity, positionX, positionY) {
        // call Phaser Physics Sprite constructor
        super(scene, positionX, positionY, 'l2enemy'); 
        // set up physics sprite
        scene.physics.add.existing(this);  
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        this.setScale(0.2);
        // add to physics system
        this.setVelocityX(velocity);            // make it go!
        this.setCollideWorldBounds(true); 
        this.body.allowGravity=true;
        this.setPushable(false);
        this.body.checkCollision.down=true; 
        this.body.checkCollision.left=true; 
        this.body.checkCollision.right=true; 
        this.body.checkCollision.up=true;             
        this.newEnemy = true;                 // custom property to control Trap spawning
    }

    update() {
        // add new Trap when existing Trap hits center X
        if(this.newEnemy && this.x < centerX) {
            this.newEnemy = false;
            // (recursively) call parent scene method from this context
            this.scene.addL2Enemy(this.parent, this.velocity);
        }        
    }
}
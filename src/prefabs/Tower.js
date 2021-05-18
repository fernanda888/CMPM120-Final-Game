class Tower extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,player) {
        // call Phaser Physics Sprite constructor
        if (facingRight){
            super(scene, player.x + 80, player.y - 25, 'tower');
        }
        else{
            super(scene, player.x - 80, player.y - 25, 'tower');
        }
         
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add to physics system
        this.setCollideWorldBounds(true); 
        this.setScale(0.2);
        this.setBounce(0);
        this.setDragY(0);
        this.body.immovable = true;
        this.body.allowGravity = false;
    }

    update() {
              
    }
}
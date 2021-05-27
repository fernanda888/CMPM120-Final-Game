class Tower extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,player,color) {
        // call Phaser Physics Sprite constructor
        if(puzzle1Scene){
            if(color=="blue"){
                super(scene, width/2, height/2, 'blueTower');
            }
            else if(color=="purple"){
                super(scene, width/2, height/2, 'purpleTower');
            }
            else if (color=="green"){
                super(scene, width/2, height/2, 'greenTower');
            }
            scene.add.existing(this);               // add to existing scene, displayList, updateList
            scene.physics.add.existing(this);       // add to physics system
            this.setCollideWorldBounds(true); 
            this.setScale(0.5);
            this.setBounce(0);
            this.setDragY(0);
            this.body.allowGravity = false;
        }
        else{
            if (facingRight){
                super(scene, player.x + 80, player.y - 30, 'tower');
            }
            else{
                super(scene, player.x - 80, player.y - 30, 'tower');
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
}

    update() {
              
    }
}
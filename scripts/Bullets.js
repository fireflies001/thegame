class Bullets extends Phaser.Physics.Arcade.Group {

    constructor (scene) {
        super(scene.Physics.world, scene);
        this.createMultiple({
            frameQuantity: 5,
            key: 'bullet',
            active: false,
            visible: false,
            classType: Bullet
        });
    }
    fireBullet (x, y) {
        let bullet = this.getFirstDead(false);
        if(bullet){
            bullet.fire(x,y);
        }
    }
}
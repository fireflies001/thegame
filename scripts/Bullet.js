class Bullet extends Phaser.Physics.Arcade.Sprite {

    constructor ( x, y){
        super(x,y,'bullet');
    }

    fire(x, y) {
        this.body.reset(x,y);

        this.setActive(true);
        this.setVisible(true);
        this.setVelocityX(300);

    }

    preUpdate (time, delta) {
        super.preUpdate(time,delta);
        if(this.x >= 500){
            this.setActive(false);
            this.setVisible(false);
        }
    }
}
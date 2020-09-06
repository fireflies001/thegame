var config = {
    type: Phaser.AUTO,
    width: 500,
    height: 500,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 120 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', 'img/sky.png');
    this.load.image('ground', 'img/ground.png');
    this.load.spritesheet('circle', 'img/avatar.png',{ frameWidth: 32, frameHeight: 48 }
    );
    this.load.spritesheet('enemy', 'img/enemy1.png', { frameWidth: 32, frameHeight: 48 }
    );
}
var platforms;
var player;
var enemy;
function create ()
{
    this.add.image(250,250, 'sky');
    platforms = this.physics.add.staticGroup();
    platforms.create(100, 510, 'ground').setScale(2).refreshBody();
    platforms.create(500, 400, 'ground');
    player = this.physics.add.sprite(100,400,'circle');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    enemy = this.physics.add.sprite(400,250, 'enemy');
    enemy.setBounce(0.2);
    enemy.setCollideWorldBounds(true);

    this.cameras.main.setBounds(0,0,500,500);
    var cam = this.cameras.main;
    cam.startFollow(player);
    cam.zoomTo(2,2000);
    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('enemy',{ start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('circle', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'circle', frame: 4 } ],
        frameRate: 20
    });
    
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('circle', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    
    player.body.setGravityY(300);
    this.physics.add.collider(platforms,player);
    this.physics.add.collider(platforms, enemy);
    this.physics.add.collider(player, enemy);
}

function update () {
    cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
    player.setVelocityX(-110);

    player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
    player.setVelocityX(110);

    player.anims.play('right', true);
    } else {
    player.setVelocityX(0);

    player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
    }
    var ans = Phaser.Math.Distance.Between(player.x,player.y,enemy.x,enemy.y);
    // console.log(ans);
    if(Phaser.Math.Distance.Between(player.x,player.y,enemy.x,enemy.y) < 100) {
        
        if (player.x < enemy.x){
            enemy.anims.play('walk', true);
            enemy.setVelocityX(-50);
        }
        else if (player.x > enemy.x ) {
            enemy.setVelocityX(50);
        }
    }

}
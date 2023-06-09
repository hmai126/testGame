class level4 extends Phaser.Scene
{
    constructor() {
        super("level4")
    }

    cursors;
    currentPlayer;
    player2;
    player1;
    movingPlatform;
    platforms;
    islands;
    playerdead;
    port;
    port2;

    preload ()
    {
        this.load.path = './assets/';
        // mine
        this.load.audio('music4', 'level4bgm.mp3');
        //
        this.load.image('sky', 'sky.png');
        this.load.image('ground', 'ground.png');
        this.load.image('samurai', 'samurai.png' );
        this.load.image('platform', 'cloudplatform.png' );
        this.load.image('island', 'floatingisland.png' );
        this.load.image('portal1', 'portal1.png');
        this.load.image('portal2', 'portal2.png');
        this.load.image('portal3', 'portal3.png');
        this.load.image('portal4', 'portal4.png');
        this.load.image('portal5', 'portal5.png');
        this.load.image('portal6', 'portal6.png');
        this.load.image('portal7', 'portal7.png');
        this.load.image('portal8', 'portal8.png');
        this.load.image('portal9', 'portal9.png');
        this.load.image('portal10', 'portal10.png');
        this.load.image('portal11', 'portal11.png');
        this.load.image('portal12', 'portal12.png');
    }

    create ()
    {
        
        // mine
        this.music =  this.sound.add('music4', {
            volume: 0.15,
            loop: true
        })
    
        if (!this.sound.locked)
        {
            // already unlocked so play
            this.music.play();
        }
        else
        {
            // wait for 'unlocked' to fire and then play
            this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
                this.music.play();
            })
        }
        //
        
        
        this.playerdead = false;
        
        
        this.add.image(500, 400, 'sky').setScale(1.4);

        const ground = this.physics.add.staticGroup();

        ground.create(500, 900, 'ground').setScale(1.3).refreshBody();
        
    
        
        
        this.player1 = this.physics.add.sprite(230, 600, 'samurai').setBounce(0.2).setCollideWorldBounds(true).setScale(0.75);
        this.player2 = this.physics.add.sprite(600, 600, 'samurai').setTint(0xff5555).setBounce(0.2).setCollideWorldBounds(true).setScale(0.75);

        this.player1.name = 'Purple';
        this.player2.name = 'Red';

        //this.player2.setPushable(false);

        this.currentPlayer = this.player1;

        // mine
        this.currentPlayer.inAir = true;
        this.currentPlayer.end = false;
        //

        //platform mechanics

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 650, 'platform').setScale(.4).refreshBody();
        
        this.islands = this.physics.add.staticGroup();
        const island1 = this.islands.create(200, 380, 'island').refreshBody();
        const island2 = this.islands.create(400, 260, 'island').refreshBody();

        this.movingPlatform = this.physics.add.image(280, 500, 'platform');
        this.movingPlatform.setScale(.4);
        this.movingPlatform.setImmovable(true);
        this.movingPlatform.body.allowGravity = false;
        this.movingPlatform.setVelocityX(50);

        
        //portal mechanics

        this.anims.create({
            key: 'portal',
            frames: [
                { key: 'portal1' },
                { key: 'portal2' },
                { key: 'portal3' },
                { key: 'portal4' },
                { key: 'portal5' },
                { key: 'portal6' },
                { key: 'portal7' },
                { key: 'portal8' },
                { key: 'portal9' },
                { key: 'portal10' },
                { key: 'portal11' },
                { key: 'portal12', duration: 50 }
            ],
            frameRate: 8,
            repeat: -1
        });

        // mine purple player idle animations
        this.anims.create({
            key: 'purpleidle',
            frames: [
                {key: 'purpleidle0'},
                {key: 'purpleidle1'},
                {key: 'purpleidle2'},
            ],
            delay: 150,
            frameRate: 3,
        });
        //

        // mine purple player run animations
        this.anims.create({
            key: 'purplerun',
            frames: [
                {key: 'purplerun0'},
                {key: 'purplerun1'},
                {key: 'purplerun2'},
                {key: 'purplerun3'},
            ],
            frameRate: 4,
        });
        
        this.anims.create({
            key: 'purplejump',
            frames: [
                {key: 'purple_jump'},
            ],
            delay: 2,
            frameRate: 3,
        });
        //

         // mine red player idle animations
         this.anims.create({
            key: 'redidle',
            frames: [
                {key: 'redidle0'},
                {key: 'redidle1'},
                {key: 'redidle2'},
            ],
            delay: 150,
            frameRate: 3,
        });
        //

        // mine player run animations
        this.anims.create({
            key: 'redrun',
            frames: [
                {key: 'redrun0'},
                {key: 'redrun1'},
                {key: 'redrun2'},
                {key: 'redrun3'},
            ],
            frameRate: 4,
        });
        this.anims.create({
            key: 'redjump',
            frames: [
                {key: 'red_jump'},
            ],
            delay: 2,
            frameRate: 3,
        });
        //
       

        this.port = this.physics.add.staticGroup();
        this.port.create(750, 400, "portal1").setScale(.5).refreshBody();
        this.add.sprite(750, 400, 'portal1')
            .play('portal').setTint(0xff5555);
        
        this.port2 = this.physics.add.staticGroup();
        
        this.physics.add.collider(this.port, this.player2, this.destroyghost, () => {

            // mine
              this.music =  this.sound.add('entPortal', {
                volume: 0.2,
                loop: false
            })
        
            if (!this.sound.locked)
            {
                // already unlocked so play
                this.music.play();
            }
            else
            {
                // wait for 'unlocked' to fire and then play
                this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
                    this.music.play();
                })
            }
            //
            
            this.port2.create(750, 210, "portal1").setScale(.5).refreshBody();
            this.add.sprite(750, 210, 'portal1')
            .play('portal');

        } );
        
        this.physics.add.collider(this.currentPlayer, this.port2, () => {
            // mine
            this.music =  this.sound.add('entPortal', {
                volume: 0.2,
                loop: false
            })
        
            if (!this.sound.locked)
            {
                // already unlocked so play
                this.music.play();
            }
            else
            {
                // wait for 'unlocked' to fire and then play
                this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
                    this.music.play();
                })
            }
            this.currentPlayer.end = true;
            //
            this.time.delayedCall(200, () => this.scene.start('level5'));

        });

        
        
        /*
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });*/

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.player1, ground, () => {
            // mine
            if (this.currentPlayer.inAir == true && this.currentPlayer == this.player1) {
                this.music =  this.sound.add('landing', {
                    volume: 0.2,
                    loop: false
                })
            
                if (!this.sound.locked)
                {
                    // already unlocked so play
                    this.music.play()
                }
                else
                {
                    // wait for 'unlocked' to fire and then play
                    this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
                        this.music.play()
                    })
                }
                this.currentPlayer.inAir = false;
            }
            //
        });
        this.physics.add.collider(this.player2, ground, () => {
            // mine
            if (this.currentPlayer.inAir == true && this.currentPlayer == this.player2) {
                this.music =  this.sound.add('landing', {
                    volume: 0.2,
                    loop: false
                })
            
                if (!this.sound.locked)
                {
                    // already unlocked so play
                    this.music.play()
                }
                else
                {
                    // wait for 'unlocked' to fire and then play
                    this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
                        this.music.play()
                    })
                }
                this.currentPlayer.inAir = false;
            }
            //
        });

        this.physics.add.collider(this.player1, ground);
        this.physics.add.collider(this.player2, ground);

        this.physics.add.collider(this.player1, this.player2);
        this.physics.add.collider(this.player2, this.movingPlatform, () => {
            this.currentPlayer.inAir = false;
            return this.currentPlayer.body.velocity.y >= 0;
        });

        // this.physics.add.collider(player2, player1);

        window.body1 = this.player1.body;
        window.physics = this.physics;
        window.showit = false;

        this.input.on('pointerdown', () =>
        {

            if (this.currentPlayer === this.player1)
            {
                this.currentPlayer = this.player2;
                this.player1.anims.play('purpleidle', true);
            }
            else
            {
                this.currentPlayer = this.player1;
                this.player2.anims.play('redidle', true);
            }

        }, this);

        
        
        this.physics.add.collider(this.currentPlayer, this.movingPlatform, () => {
            this.currentPlayer.inAir = false;
            return this.currentPlayer.body.velocity.y >= 0;
        });

        this.physics.add.collider(this.currentPlayer, this.islands, () => {
            this.currentPlayer.inAir = false;
            return this.currentPlayer.body.velocity.y >= 0;
        });

        this.physics.add.collider(this.player2, this.islands, () => {
            this.currentPlayer.inAir = false;
            return this.currentPlayer.body.velocity.y >= 0;
        });
        
        this.physics.add.collider(
            this.currentPlayer,
            this.platforms,
            null,
            (currentPlayer, platforms) =>
            {
                this.currentPlayer.inAir = false;
                return currentPlayer.body.velocity.y >= 0;
            });

            this.physics.add.collider(
                this.player2,
                this.platforms,
                null,
                (player2, platforms) =>
                {
                    this.currentPlayer.inAir = false;
                    return player2.body.velocity.y >= 0;
                });

       
        
                //this.add.text(30, 30, 'CLICK TO CHANGE CHARACTER', { fontSize: '44px', fill: 'black' });

        


    }

    

    update ()
    {
        
        if (this.currentPlayer.inAir == true){
            this.currentPlayer.anims.play('purplejump');
        }

        if (this.cursors.left.isDown && this.currentPlayer.scene)
        {
            this.currentPlayer.flipX = true;
            if(this.currentPlayer.body.touching.down){
                this.currentPlayer.anims.play('purplerun', true);
            }
            
            this.currentPlayer.setVelocityX(-160);
        }
        else if (this.cursors.right.isDown && this.currentPlayer.scene)
        {
            if(this.currentPlayer.flipX = true){
                this.currentPlayer.flipX = false;
            }
            
            if(this.currentPlayer.body.touching.down){
                this.currentPlayer.anims.play('purplerun', true);
            }
            
            this.currentPlayer.setVelocityX(160);
        }
        else
        {
            this.currentPlayer.setVelocityX(0);
            
            if(this.currentPlayer.body.touching.down){
                this.currentPlayer.anims.play('purpleidle', true);
            } else {
            this.currentPlayer.anims.play('purplejump');
            }
        }

        if (this.cursors.up.isDown && this.currentPlayer.body.touching.down && this.currentPlayer.scene)
        {

             // mine
             this.music =  this.sound.add('jumpSFX', {
                volume: 0.2,
                loop: false
            })
        
            if (!this.sound.locked)
            {
                // already unlocked so play
                this.music.play()
            }
            else
            {
                // wait for 'unlocked' to fire and then play
                this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
                    this.music.play()
                })
            }

            this.currentPlayer.inAir = true;
            //

            this.currentPlayer.setVelocityY(-230);

            window.showit = true;
        }

        if (this.movingPlatform.x >= 700)
        {
            this.movingPlatform.setVelocityX(-50);
        }
        else if (this.movingPlatform.x <= 200)
        {
            this.movingPlatform.setVelocityX(50);
        }

        // mine
        if (this.currentPlayer.end == true) {
            this.music =  this.sound.get('music4');
            console.log(this.music);
            this.music.stop();
        }
        //
    }

    destroyghost(player2, port){
        player2.disableBody(true, true);
    }
}
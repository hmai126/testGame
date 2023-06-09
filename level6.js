class level6 extends Phaser.Scene
{
    constructor() {
        super("level6")
    }

    time = 0;
    enemyBullets;
    playerBullets;
    cursors;
    currentPlayer;
    //player2;
    player1;
    movingPlatform;
    platforms;
    islands;
    playerdead;
    port;
    port2;
    redenemy;
    //redenemy2;

    preload ()
    {
        this.load.path = './assets/';
        // mine
        this.load.audio('music6', 'level6bgm.mp3');
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
        this.load.image('enemy', 'enemy.png' );
        this.load.image('tengu', 'tengu.png');
        this.load.image('bullet', 'bullet.png');
        this.load.image('reticle', 'reticle.png');
        this.load.image('jail', 'gaybabyjail.png');
        this.load.image('pbullet', 'playerbullet.png');
    }

    create ()
    {
        
        // mine
        this.music =  this.sound.add('music6', {
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
        
        this.playerBullets = this.physics.add.group({ classType: pBullet, runChildUpdate: true });
        this.enemyBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });

        this.playerdead = false;
        
        
        this.add.image(500, 400, 'sky').setScale(1.4);

        const ground = this.physics.add.staticGroup();

        ground.create(500, 900, 'ground').setScale(1.3).refreshBody();
        
    
        this.reticle = this.physics.add.sprite(200, 200, 'reticle');
        this.reticle.body.allowGravity = false;
        this.reticle.setOrigin(0.5, 0.5).setDisplaySize(25, 25).setCollideWorldBounds(true);
        
        this.player1 = this.physics.add.sprite(60, 100, 'samurai').setBounce(0.2).setCollideWorldBounds(true).setScale(0.75);
        //this.player2 = this.physics.add.sprite(600, 600, 'samurai').setTint(0xff5555).setBounce(0.2).setCollideWorldBounds(true).setScale(0.75);

        this.player1.name = 'Purple';
        //this.player2.name = 'Red';

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
       //const island1 = this.islands.create(60, 400, 'island').refreshBody();
       const island2 = this.islands.create(180, 380, 'island').refreshBody();
       const island3 = this.islands.create(380, 300, 'island').refreshBody();
       const island4 = this.islands.create(560, 180, 'island').refreshBody();
       const island5 = this.islands.create(760, 180, 'island').refreshBody();

       
       this.movingPlatform = this.physics.add.image(460, 500, 'platform');
       this.movingPlatform.setScale(.4);
       this.movingPlatform.setImmovable(true);
       this.movingPlatform.body.allowGravity = false;
       this.movingPlatform.setVelocityX(-70);

       
       //enemy mechanics (see update functions for movement)

       this.tengu = this.physics.add.image(600, 350, 'tengu');
       this.tengu.setImmovable(true);
       this.tengu.body.allowGravity = false;
       this.tengu.lastFired = 0;

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
       

       // this.port = this.physics.add.staticGroup();
        //this.port.create(750, 400, "portal1").setScale(.5).refreshBody();
        //this.add.sprite(750, 400, 'portal1')
            //.play('portal').setTint(0xff5555);
        
        this.port2 = this.physics.add.staticGroup();
        
        /*
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

            this.port2.create(360, 60, "portal1").setScale(.5).refreshBody();
            this.add.sprite(360, 60, 'portal1')
            .play('portal');

        } );
        */
       
        /*
        this.physics.add.collider( this.redenemy, this.player2, this.destroyghost,  () => {
            // mine
            this.music =  this.sound.add('deathsfx', {
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
            this.time.delayedCall(200, () => this.scene.restart());

        });
        */

        this.physics.add.collider(this.player1, this.redenemy2,  () => {
            // mine
            this.music =  this.sound.add('deathsfx', {
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
            this.time.delayedCall(200, () => this.scene.restart());

        });
        
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

            this.time.delayedCall(200, () => this.scene.start('Reset'));

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
        /*
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
        */

        this.physics.add.collider(this.player1, this.redenemy);
        //this.physics.add.collider(this.player2, this.redenemy);

        this.physics.add.collider(this.player1, this.redenemy2);
        //this.physics.add.collider(this.player2, this.redenemy2);

        /*
        this.physics.add.collider(this.player1, this.player2);
        this.physics.add.collider(this.player2, this.movingPlatform, () => {
            this.currentPlayer.inAir = false;
            return this.currentPlayer.body.velocity.y >= 0;
        });
        */

        // this.physics.add.collider(player2, player1);

        window.body1 = this.player1.body;
        window.physics = this.physics;
        window.showit = false;

        /*
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
        */

        
        
        this.physics.add.collider(this.currentPlayer, this.movingPlatform, () => {
            this.currentPlayer.inAir = false;
            return this.currentPlayer.body.velocity.y >= 0;
        });

        this.physics.add.collider(this.currentPlayer, this.islands, () => {
            if (this.currentPlayer.inAir == true) {
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
            }
            //
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
            /*
            this.physics.add.collider(
                this.player2,
                this.platforms,
                null,
                (player2, platforms) =>
                {
                    this.currentPlayer.inAir = false;
                    return player2.body.velocity.y >= 0;
                });
                */

       
        
                //this.add.text(30, 30, 'CLICK TO CHANGE CHARACTER', { fontSize: '44px', fill: 'black' });

    
                this.tengu.active=true;
                this.tengu.health = 3;
                this.currentPlayer.active = true;
                this.currentPlayer.health = 10;

                this.input.on('pointerdown', (pointer, time, lastFired) =>
                {
                    if (this.currentPlayer.active === false) { return; }
        
                    // Get bullet from bullets group
                    const pbullet = this.playerBullets.get().setActive(true).setVisible(true);
        
                    if (pbullet)
                    {
                        pbullet.fire(this.currentPlayer, this.reticle);
                        this.physics.add.collider(this.tengu, pbullet, (enemyHit, bulletHit) => this.enemyHitCallback(enemyHit, bulletHit));
                    }
                });

                game.canvas.addEventListener('mousedown', () => {
                    game.input.mouse.requestPointerLock();
                });
        
                // Exit pointer lock when Q or escape (by default) is pressed.
                this.input.keyboard.on('keydown_Q', event => {
                    if (game.input.mouse.locked) { game.input.mouse.releasePointerLock(); }
                }, 0);
        

                this.input.on('pointermove', pointer =>
                 {
                    if (this.input.mouse.locked)
                {
                this.reticle.x += pointer.movementX;
                this.reticle.y += pointer.movementY;
                    }
                });
                
                if(this.currentPlayer.health <= 0){
           
                    this.scene.restart();
                
                    }   

                    this.tenguMoving = this.tweens.add({
                        targets: this.tengu.body.velocity,
                        props: {
                            x: { from: 250, to: -250, duration: 3500 },
                            y: { from: 50, to: -50, duration: 2000 }
                        },
                        ease: 'Sine.easeInOut',
                        yoyo: true,
                        repeat: -1
                    });

                    this.jail = this.physics.add.image(900, 600, 'jail');
                    this.jail.flipX = true;
                    this.jail.setImmovable(true);
                    this.jail.body.allowGravity = false;

                    this.jailFloating = this.tweens.add({
                        targets: this.jail.body.velocity,
                        props: {
                            
                            y: { from: 50, to: -50, duration: 2000 }
                        },
                        ease: 'Sine.easeInOut',
                        yoyo: true,
                        repeat: -1
                    });


    }

    

    update (time, delta)
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
            this.movingPlatform.setVelocityX(-70);
        }
        else if (this.movingPlatform.x <= 200)
        {
            this.movingPlatform.setVelocityX(70);
        }

        this.enemyFire(time);
        /*
        if (this.redenemy.x >= 700)
        {
            this.redenemy.setVelocityX(-50);
        }
        else if (this.redenemy.x <= 200)
        {
            this.redenemy.setVelocityX(50);
        }

        if (this.redenemy2.y >= 220)
        {
            this.redenemy2.setVelocityY(-50);
        }
        else if (this.redenemy2.y <= 20)
        {
            this.redenemy2.setVelocityY(50);
        }
*/
    
    if(this.currentPlayer.health <= 0){
           
        this.scene.restart();

    }   

    if(this.tengu.health <= 0){
    this.scene.start('Reset')
    }
    // mine
    if (this.currentPlayer.end == true) {
        this.music =  this.sound.get('music6');
        console.log(this.music);
        this.music.stop();
    }
    //
    }

    
    enemyHitCallback (enemyHit, bulletHit)
    {
        // Reduce health of enemy
        if (bulletHit.active === true && enemyHit.active === true)
        {
            enemyHit.health = enemyHit.health - 1;
            //console.log('Enemy hp: ', enemyHit.health);

            // Kill enemy if health <= 0
            if (enemyHit.health <= 0)
            {
                enemyHit.setActive(false).setVisible(false);
            }

            // Destroy bullet
            bulletHit.setActive(false).setVisible(false);
        }
    }

    /*destroyghost(player2, port, redenemy, redenemy2){
        player2.disableBody(true, true);
    }*/

    playerHitCallback (playerHit, bulletHit)
    {
        if (bulletHit.active === true && playerHit.active === true)
        {
            playerHit.health = playerHit.health - 1;
            
            if(playerHit.health <= 0){
                
                playerHit.setActive(false);
                this.currentPlayer.disableBody(true,true);
               
            
            
            }

           
        }

            // Destroy bullet
            bulletHit.setActive(false).setVisible(false);
    }
    

    enemyFire (time)
    {
        if (this.tengu.active === false)
        {
            return;
        }

        if ((time - this.tengu.lastFired) > 1000)
        {
            this.tengu.lastFired = time;

            // Get bullet from bullets group
            const bullet = this.enemyBullets.get().setActive(true).setVisible(true);

            if (bullet)
            {
                bullet.fire(this.tengu, this.currentPlayer);

                // Add collider between bullet and player
                this.physics.add.collider(this.currentPlayer, bullet, (playerHit, bulletHit) => this.playerHitCallback(playerHit, bulletHit));
            }
        }
    }
}

    



class Bullet extends Phaser.GameObjects.Image
{
    constructor (scene)
    {
        super(scene, 0, 0, 'bullet');
        this.speed = 10;
        this.born = 0;
        this.direction = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.setSize(12, 12, true);
    }

    fire (shooter, target)
    {
        this.setPosition(shooter.x, shooter.y); // Initial position
        this.direction = Math.atan((target.x - this.x) / (target.y - this.y));

        // Calculate X and y velocity of bullet to moves it from shooter to target
        if (target.y >= this.y)
        {
            this.xSpeed = this.speed * Math.sin(this.direction);
            this.ySpeed = this.speed * Math.cos(this.direction);
        }
        else
        {
            this.xSpeed = -this.speed * Math.sin(this.direction);
            this.ySpeed = -this.speed * Math.cos(this.direction);
        }

        this.rotation = shooter.rotation; // angle bullet with shooters rotation
        this.born = 0; // Time since new bullet spawned
    }

    update (time)
    {
        this.x += this.xSpeed; //* delta;
        this.y += this.ySpeed; //* delta;
        //this.born += delta;
        if (this.born > 1800)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }

}

class pBullet extends Phaser.GameObjects.Image
{
    constructor (scene)
    {
        super(scene, 0, 0, 'pbullet');
        this.speed = 10;
        this.born = 0;
        this.direction = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.setSize(12, 12, true);
    }

    fire (shooter, target)
    {
        this.setPosition(shooter.x, shooter.y); // Initial position
        this.direction = Math.atan((target.x - this.x) / (target.y - this.y));

        // Calculate X and y velocity of bullet to moves it from shooter to target
        if (target.y >= this.y)
        {
            this.xSpeed = this.speed * Math.sin(this.direction);
            this.ySpeed = this.speed * Math.cos(this.direction);
        }
        else
        {
            this.xSpeed = -this.speed * Math.sin(this.direction);
            this.ySpeed = -this.speed * Math.cos(this.direction);
        }

        this.rotation = shooter.rotation; // angle bullet with shooters rotation
        this.born = 0; // Time since new bullet spawned
    }

    update (time)
    {
        this.x += this.xSpeed; //* delta;
        this.y += this.ySpeed; //* delta;
        //this.born += delta;
        if (this.born > 1800)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}


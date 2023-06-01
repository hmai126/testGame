
class SHGamesIntro extends Phaser.Scene {
    constructor() {
        super('SHGamesIntro');
    }
    
    preload(){
        this.load.path = './assets/';
        this.load.audio('evillaugh', 'laugh.mp3'); 
        //this.load.image('sectionimage', 'sectionimage.png');
        //this.load.video(SHGopen, 'SHGopenaudio.mp4'); 
    }
    create(){

        //this.sound.play('evillaugh');
        const music = this.sound.add('evillaugh');

        music.play();

        //this.sound.pauseOnBlur = true;
        

        const video = this.add.video(500, 500);
        video.setScale(1.6);

        video.loadURL('assets/SHGopencnd.png.mp4', true);
        
        video.play(false);

       
        
        this.time.delayedCall(5000, () =>{this.scene.start('OpeningCutscene')})
    }

}

class OpeningCutscene extends Phaser.Scene {
    constructor() {
        super('OpeningCutscene');
    }
    
    preload(){
        this.load.path = './assets/';
        this.load.image('cutscene', 'CloudSamuraiCutscene.png');
        
    }
    create(){

        
        this.imageObject = this.add.image(
            500,
            500,
            'cutscene',
        )
        this.imageObject.setScale(.4)
        
        this.time.delayedCall(5000, () =>{this.scene.start('GameMenu')})
    }

}

class GameMenu extends Phaser.Scene {
    constructor() {
        super('GameMenu');
    }
    
    preload(){
        this.load.path = './assets/';
        this.load.audio('menusong', 'menusong.mp3');
        this.load.video(GameMenu, 'GameOpen.mp4'); 
    }
    create(){

        this.add.text(10, 25, "Cloud Samurai", {
            fontFamily:'Georgia, serif', 
            fontSize: 48,
        })

        this.add.text(600, 900, 'click anywhere to begin', {fontFamily:'Georgia, serif', fontSize: 36,});
            

        /*const music = this.sound.add('menusong', { loop: true });

        music.play();*/

        const video = this.add.video(500, 500);
        video.setScale(1.4);

        video.loadURL('assets/GameOpen.mp4', true);
        
        video.play(true);

        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('level1'));
        });

        
        
    }

}







class Reset extends Phaser.Scene {
    constructor() {
        super("Reset")
    }

    preload(){}

    create() {
        


                this.time.delayedCall(1000, () => {
                    let textObject = this.add.text(300,300, "You pass through the portal\nand fulfill your destiny\nyou have regained your soul").setFontSize(20);
                    textObject.setOrigin(0.5);
                    textObject.alpha = 0;

                    this.tweens.add({
                        targets: textObject,
                        alpha: 1,
                        duration: 1000,
                        ease: 'Linear'
                      });
                });

                

                this.time.delayedCall(3600, () => {
                    let textObject = this.add.text(300,500, "Click anywhere to Reset").setFontSize(20);
                    textObject.setOrigin(0.5);
                    textObject.alpha = 0;

                    this.tweens.add({
                        targets: textObject,
                        alpha: 1,
                        duration: 1000,
                        ease: 'Linear'
                      });

                      this.input.on('pointerdown', () => {
                        this.cameras.main.fade(1000, 0,0,0);
                        this.time.delayedCall(1000, () => this.scene.start('GameMenu'));
                    });
                });
        

    }
}

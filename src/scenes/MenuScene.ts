import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        this.cameras.main.setBackgroundColor('#000033');
        
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // Tytuł gry
        this.add.text(centerX, centerY - 100, 'Zabbor: The Game', {
            font: '48px Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Przycisk Start
        const startButton = this.add.text(centerX, centerY + 50, 'Rozpocznij Grę', {
            font: '32px Arial',
            color: '#00ff00',
        }).setOrigin(0.5);

        // Interaktywność przycisku
        startButton.setInteractive({ useHandCursor: true });

        startButton.on('pointerover', () => {
            startButton.setStyle({ color: '#aaffaa' });
        });

        startButton.on('pointerout', () => {
            startButton.setStyle({ color: '#00ff00' });
        });

        startButton.on('pointerdown', () => {
            // Uruchom scenę gry i scenę UI równolegle
            this.scene.start('GameScene');
            this.scene.launch('UIScene');
        });
    }
}

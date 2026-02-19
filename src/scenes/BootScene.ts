import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // Pokaż pasek ładowania
        this.createLoadingBar();

        // Ładuj assety
        // Klucz 'player' będzie używany do odwoływania się do tej grafiki w grze
        this.load.image('player', 'player.png'); 
        
        // Przykładowe ładowanie tilemapy (odkomentuj, gdy będziesz miał swoje assety)
        // this.load.image('tiles', 'assets/tileset.png');
        // this.load.tilemapTiledJSON('map', 'assets/map.json');
    }

    create() {
        // Inicjalizacja rejestru gry - miejsce na dane współdzielone między scenami
        this.registry.set('playerData', {
            inventory: [],
            stats: { hp: 100, maxHp: 100, mp: 50, maxMp: 50, gold: 0 }
        });

        // Po załadowaniu wszystkich assetów, przejdź do sceny menu
        this.scene.start('MenuScene');
    }

    private createLoadingBar() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2 - 30, 320, 50);

        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                color: '#ffffff'
            }
        }).setOrigin(0.5, 0.5);

        const percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                color: '#ffffff'
            }
        }).setOrigin(0.5, 0.5);

        this.load.on('progress', (value: number) => {
            percentText.setText(parseInt((value * 100).toString(), 10) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 - 20, 300 * value, 30);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
        });
    }
}

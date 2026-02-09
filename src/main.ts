import Phaser from 'phaser';
import MenuScene from './scenes/MenuScene';

const TILE_SIZE = 32;
const MAP_WIDTH = 50; // Szerokość mapy w kafelkach
const MAP_HEIGHT = 50; // Wysokość mapy w kafelkach
const VIEWPORT_WIDTH = 20; // Szerokość widoku (kamery) w kafelkach
const VIEWPORT_HEIGHT = 15; // Wysokość widoku (kamery) w kafelkach

class GameScene extends Phaser.Scene {
    private player!: Phaser.GameObjects.Sprite;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private lastMoveTime = 0;
    private moveDelay = 150;

    constructor() {
        super('GameScene');
    }

    preload() {
        // 1. Ładujemy grafikę z folderu public
        this.load.image('hero', 'player.png');
    }

    create() {
        const graphics = this.add.graphics();

        // Rysujemy siatkę tła
        graphics.lineStyle(1, 0x222222);
        for (let i = 0; i < MAP_WIDTH * TILE_SIZE; i += TILE_SIZE) graphics.lineBetween(i, 0, i, MAP_HEIGHT * TILE_SIZE);
        for (let i = 0; i < MAP_HEIGHT * TILE_SIZE; i += TILE_SIZE) graphics.lineBetween(0, i, MAP_WIDTH * TILE_SIZE, i);

        // 2. Tworzymy Sprite'a
        this.player = this.add.sprite(TILE_SIZE * 5, TILE_SIZE * 5, 'hero');
        this.player.setOrigin(0);
        this.player.setDisplaySize(TILE_SIZE, TILE_SIZE);

        // Konfiguracja kamery
        this.cameras.main.setBounds(0, 0, MAP_WIDTH * TILE_SIZE, MAP_HEIGHT * TILE_SIZE);
        this.cameras.main.startFollow(this.player);

        if (this.input.keyboard) {
            this.cursors = this.input.keyboard.createCursorKeys();
            
            // Klawisz I otwiera menu
            this.input.keyboard.on('keydown-I', () => {
                this.scene.pause();
                this.scene.launch('MenuScene');
            });
        }
    }

    update(time: number) {
        if (time < this.lastMoveTime + this.moveDelay) return;

        let dx = 0;
        let dy = 0;

        if (this.cursors.left.isDown) {
            dx = -1;
            this.player.flipX = true;
        } else if (this.cursors.right.isDown) {
            dx = 1;
            this.player.flipX = false;
        } else if (this.cursors.up.isDown) {
            dy = -1;
        } else if (this.cursors.down.isDown) {
            dy = 1;
        }

        if (dx !== 0 || dy !== 0) {
            const nextX = this.player.x + dx * TILE_SIZE;
            const nextY = this.player.y + dy * TILE_SIZE;

            // Sprawdzenie granic mapy
            if (nextX >= 0 && nextX < MAP_WIDTH * TILE_SIZE && nextY >= 0 && nextY < MAP_HEIGHT * TILE_SIZE) {
                this.player.setPosition(nextX, nextY);
                this.lastMoveTime = time;
            }
        }
    }
}

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT, // Skaluje grę, aby zmieściła się w oknie (zachowując proporcje)
        autoCenter: Phaser.Scale.CENTER_BOTH, // Wyśrodkowuje grę w oknie
        width: VIEWPORT_WIDTH * TILE_SIZE, // Stała szerokość logiczna widoku
        height: VIEWPORT_HEIGHT * TILE_SIZE // Stała wysokość logiczna widoku
    },
    parent: 'app',
    pixelArt: true, // Zachowuje ostrość pikseli grafiki AI
    scene: [GameScene, MenuScene] // Rejestrujemy obie sceny
};

new Phaser.Game(config);
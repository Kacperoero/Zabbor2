import Phaser from 'phaser';

const TILE_SIZE = 32;

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'app',
    pixelArt: true, // Zachowuje ostrość pikseli grafiki AI
    scene: { preload, create, update }
};

new Phaser.Game(config);

// Zmieniamy typ z Rectangle na Sprite
let player: Phaser.GameObjects.Sprite; 
let cursors: Phaser.Types.Input.Keyboard.CursorKeys;
let lastMoveTime = 0;
const moveDelay = 150;

function preload(this: Phaser.Scene) {
    // 1. Ładujemy grafikę z folderu public
    // Zakładamy, że plik nazywa się player.png
    this.load.image('hero', 'player.png');
}

function create(this: Phaser.Scene) {
    // Dodajemy prostą siatkę tła, żeby widzieć ruch
    const graphics = this.add.graphics();
    graphics.lineStyle(1, 0x222222);
    for (let i = 0; i < window.innerWidth; i += TILE_SIZE) graphics.lineBetween(i, 0, i, window.innerHeight);
    for (let i = 0; i < window.innerHeight; i += TILE_SIZE) graphics.lineBetween(0, i, window.innerWidth, i);

    // 2. Tworzymy Sprite'a zamiast Rectangle
    // 'hero' to klucz, który nadaliśmy w preload
    player = this.add.sprite(TILE_SIZE * 5, TILE_SIZE * 5, 'hero');
    
    // Ustawiamy punkt zakotwiczenia na lewy górny róg (jak w Margonem)
    player.setOrigin(0);
    
    // Jeśli grafika AI jest większa/mniejsza niż 32x32, możemy ją skalować:
    player.setDisplaySize(TILE_SIZE, TILE_SIZE);

    if (this.input.keyboard) {
        cursors = this.input.keyboard.createCursorKeys();
    }
}

function update(this: Phaser.Scene, time: number) {
    if (time < lastMoveTime + moveDelay) return;

    if (cursors.left.isDown) {
        player.x -= TILE_SIZE;
        player.flipX = true; // Prosty trik: obracamy postać w lewo
        lastMoveTime = time;
    } else if (cursors.right.isDown) {
        player.x += TILE_SIZE;
        player.flipX = false; // Postać patrzy w prawo
        lastMoveTime = time;
    } else if (cursors.up.isDown) {
        player.y -= TILE_SIZE;
        lastMoveTime = time;
    } else if (cursors.down.isDown) {
        player.y += TILE_SIZE;
        lastMoveTime = time;
    }
}
import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    private speed = 200;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        // Wywołujemy konstruktor klasy nadrzędnej (Sprite)
        super(scene, x, y, 'player');

        // Dodaj fizykę do obiektu gracza
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Ustawienia fizyki
        this.setCollideWorldBounds(true);
        this.body.setSize(this.width * 0.8, this.height * 0.9);

        // Inicjalizacja sterowania
        if (!scene.input.keyboard) {
            throw new Error('Keyboard not available.');
        }
        this.cursors = scene.input.keyboard.createCursorKeys();
    }

    // Ta metoda będzie wywoływana w pętli `update` sceny gry
    public handleInput() {
        // Resetuj prędkość
        this.setVelocity(0);

        // Ustaw prędkość na podstawie wciśniętych klawiszy
        if (this.cursors.left.isDown) {
            this.setVelocityX(-this.speed);
            this.flipX = true; // Odwróć sprita w lewo
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(this.speed);
            this.flipX = false; // Ustaw sprita w prawo
        }

        if (this.cursors.up.isDown) {
            this.setVelocityY(-this.speed);
        } else if (this.cursors.down.isDown) {
            this.setVelocityY(this.speed);
        }

        // Normalizuj wektor prędkości, aby ruch po przekątnej nie był szybszy
        this.body.velocity.normalize().scale(this.speed);
    }
}

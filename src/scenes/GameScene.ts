import Phaser from 'phaser';
import Player from '../entities/Player';

export default class GameScene extends Phaser.Scene {
    private player!: Player;

    constructor() {
        super('GameScene');
    }

    create() {
        // --- Tworzenie mapy (wersja uproszczona bez assetów) ---
        // Stworzymy prostą siatkę, aby symulować mapę.
        const mapWidth = 1600;
        const mapHeight = 1200;
        const TILE_SIZE = 32;
        this.add.grid(0, 0, mapWidth * 2, mapHeight * 2, TILE_SIZE, TILE_SIZE, 0x00b9f2, 1, 0x002e43).setOrigin(0);


        // --- Tworzenie gracza ---
        // Stawiamy gracza na środku mapy
        this.player = new Player(this, mapWidth / 2, mapHeight / 2);

        // --- Konfiguracja kamery ---
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
        this.physics.world.setBounds(0, 0, mapWidth, mapHeight);

        // --- Komunikacja z UI ---
        // Pobierz dane z rejestru
        const playerData = this.registry.get('playerData');

        // Wyślij pierwsze dane do sceny UI
        // Scena UI nasłuchuje na to zdarzenie, aby zaktualizować HUD
        this.events.emit('updateUI', playerData);


        // Przykład użycia Event Emittera: Gracz 'podnosi' przedmiot
        this.input.on('pointerdown', () => {
            const newItem = `Eliksir Zdrowia #${Math.floor(Math.random() * 100)}`;
            playerData.inventory.push(newItem);
            playerData.stats.gold += 10;
            
            // Zaktualizuj dane w rejestrze
            this.registry.set('playerData', playerData);

            // Wyślij zaktualizowane dane do UI
            this.events.emit('updateUI', playerData);

            console.log(`Podniesiono: ${newItem}. Stan ekwipunku:`, playerData.inventory);
        });
    }

    update() {
        // Aktualizuj logikę gracza (obsługa inputu)
        if (this.player) {
            this.player.handleInput();
        }
    }
}

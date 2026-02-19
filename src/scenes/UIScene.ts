import Phaser from 'phaser';

export default class UIScene extends Phaser.Scene {
    private hpText!: Phaser.GameObjects.Text;
    private mpText!: Phaser.GameObjects.Text;
    private goldText!: Phaser.GameObjects.Text;
    
    private inventoryPanel!: Phaser.GameObjects.Container;
    private inventorySlots: Phaser.GameObjects.Text[] = [];

    constructor() {
        super({ key: 'UIScene', active: false });
    }

    create() {
        const { width, height } = this.cameras.main;

        // --- HUD (Paski zdrowia, many etc.) ---
        this.hpText = this.add.text(20, 20, '', { font: '20px Arial', color: '#ff0000' });
        this.mpText = this.add.text(20, 50, '', { font: '20px Arial', color: '#0000ff' });
        this.goldText = this.add.text(20, 80, '', { font: '20px Arial', color: '#ffd700' });

        // --- Przycisk Ekwipunku ---
        const inventoryButton = this.add.text(width - 20, height - 20, 'Ekwipunek', {
            font: '24px Arial',
            color: '#ffffff',
            backgroundColor: '#333333',
            padding: { x: 10, y: 5 }
        }).setOrigin(1, 1);

        inventoryButton.setInteractive({ useHandCursor: true });
        inventoryButton.on('pointerdown', () => {
            this.toggleInventory();
        });

        // --- Panel Ekwipunku ---
        this.createInventoryPanel();

        // --- Nasłuchiwanie na zdarzenia z GameScene ---
        const gameScene = this.scene.get('GameScene');
        gameScene.events.on('updateUI', (playerData: any) => {
            this.updateHUD(playerData.stats);
            this.updateInventory(playerData.inventory);
        });
    }

    private createInventoryPanel() {
        const { width, height } = this.cameras.main;
        
        // Tło panelu (modal)
        const bg = this.add.graphics({ fillStyle: { color: 0x000000, alpha: 0.7 } });
        bg.fillRect(0, 0, width, height);
        
        // Ramka panelu
        const panelWidth = width * 0.6;
        const panelHeight = height * 0.7;
        const panelX = (width - panelWidth) / 2;
        const panelY = (height - panelHeight) / 2;
        const panelFrame = this.add.graphics({ lineStyle: { width: 2, color: 0xffffff }, fillStyle: { color: 0x111111 } });
        panelFrame.fillRect(panelX, panelY, panelWidth, panelHeight);
        panelFrame.strokeRect(panelX, panelY, panelWidth, panelHeight);

        // Tytuł
        const title = this.add.text(width / 2, panelY + 20, 'Ekwipunek', { font: '32px Arial', color: '#ffffff' }).setOrigin(0.5, 0);

        // Kontener łączy wszystko w jedną grupę
        this.inventoryPanel = this.add.container(0, 0, [bg, panelFrame, title]);
        this.inventoryPanel.setVisible(false); // Domyślnie ukryty
    }

    private toggleInventory() {
        const gameScene = this.scene.get('GameScene');
        const isVisible = !this.inventoryPanel.visible;
        
        this.inventoryPanel.setVisible(isVisible);

        // Wstrzymaj/wznów grę, gdy ekwipunek jest otwarty/zamknięty
        if (isVisible) {
            gameScene.scene.pause();
        } else {
            gameScene.scene.resume();
        }
    }

    private updateHUD(stats: { hp: number; maxHp: number; mp: number; maxMp: number; gold: number }) {
        this.hpText.setText(`HP: ${stats.hp} / ${stats.maxHp}`);
        this.mpText.setText(`MP: ${stats.mp} / ${stats.maxMp}`);
        this.goldText.setText(`Złoto: ${stats.gold}`);
    }

    private updateInventory(inventory: string[]) {
        const { width, height } = this.cameras.main;
        const panelWidth = width * 0.6;
        const panelX = (width - panelWidth) / 2;
        const panelY = (height - height * 0.7) / 2;
        
        // --- Komentarz dla dewelopera ---
        // Aby dodać nowe przedmioty, wystarczy, że inny fragment kodu (np. w GameScene)
        // doda nowy element do tablicy `inventory` w `registry` i wyemituje zdarzenie 'updateUI'.
        // Ta funkcja automatycznie odświeży widok ekwipunku.

        // Wyczyść stare sloty
        this.inventorySlots.forEach(slot => slot.destroy());
        this.inventorySlots = [];

        // Stwórz nowe wpisy
        inventory.forEach((item, index) => {
            const itemText = this.add.text(panelX + 30, panelY + 80 + (index * 30), `• ${item}`, {
                font: '20px Arial',
                color: '#aaffaa'
            });
            this.inventoryPanel.add(itemText); // Dodaj tekst do kontenera panelu
            this.inventorySlots.push(itemText);
        });
    }
}

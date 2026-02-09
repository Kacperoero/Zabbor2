import Phaser from 'phaser';
import { partyManager } from '../managers/PartyManager';
import type { CharacterInstance } from '../interfaces/CharacterInstance';

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        // Półprzezroczyste tło
        this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000, 0.9).setOrigin(0);

        // Tytuł
        this.add.text(20, 20, 'DRUŻYNA (Naciśnij I aby zamknąć)', { fontSize: '24px', color: '#ffffff' });

        const members = partyManager.getMembers();
        let y = 80;

        if (members.length === 0) {
            this.add.text(this.scale.width / 2, this.scale.height / 2, 'Brak członków drużyny', { fontSize: '20px', color: '#aaaaaa' }).setOrigin(0.5);
        }

        members.forEach((member) => {
            this.renderCharacter(member, 40, y);
            y += 250; // Odstęp między postaciami
        });

        // Obsługa klawisza I do zamknięcia
        this.input.keyboard?.on('keydown-I', () => {
            this.scene.resume('GameScene');
            this.scene.stop();
        });
    }

    renderCharacter(char: CharacterInstance, x: number, y: number) {
        // Imię i Klasa
        this.add.text(x, y, `${char.name} - ${char.heroClass} (Lvl ${char.level})`, { fontSize: '22px', color: '#ffff00', fontStyle: 'bold' });

        // Atrybuty (lewa kolumna)
        const attrs = char.attributes;
        const attrText = 
            `HP: ${attrs.hp}/${attrs.maxHp}\n` +
            `MP: ${attrs.mp}/${attrs.maxMp}\n` +
            `Siła: ${attrs.strength}\n` +
            `Zręczność: ${attrs.dexterity}\n` +
            `Inteligencja: ${attrs.intelligence}\n` +
            `Szybkość: ${attrs.speed}`;
        
        this.add.text(x, y + 40, attrText, { fontSize: '16px', color: '#dddddd', lineSpacing: 5 });

        // Ekwipunek (prawa kolumna)
        const eq = char.equipment;
        const eqX = x + 250;
        const eqText = 
            `Głowa: ${eq.helmet || '---'}\n` +
            `Naszyjnik: ${eq.necklace || '---'}\n` +
            `Zbroja: ${eq.armor || '---'}\n` +
            `Rękawice: ${eq.gloves || '---'}\n` +
            `Prawa ręka: ${eq.rightHand || '---'}\n` +
            `Lewa ręka: ${eq.leftHand || '---'}\n` +
            `Buty: ${eq.boots || '---'}`;

        this.add.text(eqX, y + 40, eqText, { fontSize: '16px', color: '#aaffaa', lineSpacing: 5 });
        
        // Linia oddzielająca
        this.add.rectangle(x, y + 220, this.scale.width - 80, 2, 0x444444).setOrigin(0);
    }
}

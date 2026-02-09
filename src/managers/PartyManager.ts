import { INITIAL_STATS } from "../data/stats";
import { HeroClass } from "../enums/HeroClass";
import type { CharacterInstance } from "../interfaces/CharacterInstance";

class PartyManager {
    private members: CharacterInstance[] = [];

    constructor() {
        // Tymczasowo: Dodajemy przykładowego bohatera na start
        this.createDummyParty();
    }

    private createDummyParty() {
        this.addMember({
            name: 'Zabbor',
            heroClass: HeroClass.Knight,
            attributes: { ...INITIAL_STATS[HeroClass.Knight] },
            level: 1,
            xp: 0,
            equipment: {
                boots: 'Skórzane buty',
                armor: 'Lniana koszula',
                gloves: null,
                helmet: null,
                rightHand: 'Zardzewiały miecz',
                leftHand: 'Drewniana tarcza',
                necklace: null
            }
        });
    }

    addMember(member: CharacterInstance) {
        if (this.members.length < 3) {
            this.members.push(member);
        }
    }

    getMembers(): CharacterInstance[] {
        return this.members;
    }
}

export const partyManager = new PartyManager();

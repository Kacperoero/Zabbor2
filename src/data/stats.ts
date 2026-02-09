import { HeroClass } from "../enums/HeroClass";
import type { Attributes } from "../interfaces/Attributes";


// Przykładowe statystyki startowe (do balansu)
export const INITIAL_STATS: Record<HeroClass, Attributes> = {
    [HeroClass.Knight]: {
        hp: 150, maxHp: 150, mp: 20, maxMp: 20, speed: 4, strength: 12, dexterity: 5, intelligence: 3
    },
    [HeroClass.Paladin]: {
        // Hybryda Mag/Rycerz: Mniej HP/Siły niż Rycerz, ale więcej MP/Int
        hp: 130, maxHp: 130, mp: 60, maxMp: 60, speed: 4, strength: 9, dexterity: 4, intelligence: 8
    },
    [HeroClass.Mage]: {
        hp: 70, maxHp: 70, mp: 150, maxMp: 150, speed: 5, strength: 3, dexterity: 5, intelligence: 12
    },
    [HeroClass.Archer]: {
        hp: 90, maxHp: 90, mp: 40, maxMp: 40, speed: 7, strength: 5, dexterity: 12, intelligence: 4
    },
    [HeroClass.Crossbowman]: {
        // Hybryda Rycerz/Łucznik: Wytrzymalszy niż Łucznik, silniejszy, ale wolniejszy
        hp: 110, maxHp: 110, mp: 30, maxMp: 30, speed: 5, strength: 8, dexterity: 9, intelligence: 3
    },
    [HeroClass.Druid]: {
        // Hybryda Mag/Łucznik: Balans między magią natury a zręcznością
        hp: 85, maxHp: 85, mp: 100, maxMp: 100, speed: 6, strength: 4, dexterity: 8, intelligence: 9
    }
};

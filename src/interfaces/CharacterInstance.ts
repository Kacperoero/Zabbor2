import { HeroClass } from "../enums/HeroClass";
import type { Attributes } from "./Attributes";
import type { Equipment } from "./Equipment";

export interface CharacterInstance {
    name: string;
    heroClass: HeroClass;
    attributes: Attributes;
    level: number;
    xp: number;
    equipment: Equipment;
}

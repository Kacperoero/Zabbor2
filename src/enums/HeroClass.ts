export const HeroClass = {
    Knight: 'Rycerz',
    Paladin: 'Paladyn',
    Mage: 'Mag',
    Archer: 'Łucznik',
    Crossbowman: 'Kusznik',
    Druid: 'Druid'
} as const;

export type HeroClass = typeof HeroClass[keyof typeof HeroClass];

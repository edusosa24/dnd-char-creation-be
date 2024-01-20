export interface Character {
  general: {
    class: string;
    level: number;
    background: string;
    playerName: string;
    race: string;
    alignment: string;
    experience: number;
  };
  abilityScore: {
    inspiration: number;
    proficiencyBonus: number;
    passiveWisdom: number;
    stats: {
      strength: Stat;
      dexterity: Stat;
      constitution: Stat;
      intelligence: Stat;
      wisdom: Stat;
      charisma: Stat;
    };
    savingThrows: {
      strength: SavingThrowAndSkills;
      dexterity: SavingThrowAndSkills;
      constitution: SavingThrowAndSkills;
      intelligence: SavingThrowAndSkills;
      wisdom: SavingThrowAndSkills;
      charisma: SavingThrowAndSkills;
    };
    skills: {
      acrobatics: SavingThrowAndSkills;
      animalHandling: SavingThrowAndSkills;
      arcana: SavingThrowAndSkills;
      athletics: SavingThrowAndSkills;
      deception: SavingThrowAndSkills;
      history: SavingThrowAndSkills;
      insight: SavingThrowAndSkills;
      intimidation: SavingThrowAndSkills;
      investigation: SavingThrowAndSkills;
      medicine: SavingThrowAndSkills;
      nature: SavingThrowAndSkills;
      perception: SavingThrowAndSkills;
      performance: SavingThrowAndSkills;
      persuasion: SavingThrowAndSkills;
      religion: SavingThrowAndSkills;
      sleightOfHand: SavingThrowAndSkills;
      stealth: SavingThrowAndSkills;
      survival: SavingThrowAndSkills;
    };
  };
  featuresTraitsAndOtherProficiencies: {
    personalityTraits: string;
    ideals: string;
    bonds: string;
    flaws: string;
    featuresAndTraits: string;
    otherProficienciesAndLanguages: string;
  };
  combat: {
    armorClass: number;
    initiative: number;
    speed: number;
    maxHitPoints: number;
    currentHitPoints: number;
    temporaryHitPoints: number;
    hitDice: string;
    hitDiceTotal: string;
    deathSaves: {
      success: number;
      failure: number;
    };
    attacksAndSpellcasting: {
      weapons: Weapon[];
      extra: string;
    };
  };
  equipmentAndMoney: {
    money: {
      copper: number;
      silver: number;
      electrum: number;
      gold: number;
      platinum: number;
    };
    equipment: string;
  };
  appearance: {
    age: string;
    height: string;
    weight: string;
    eyes: string;
    skin: string;
    hair: string;
    portrait: string;
  };
  backstory: {
    backstory: string;
    alliesAndOrganizations: string;
    organizationName: string;
    organizationSymbol: string;
    additionalFeaturesAndTraits: string;
    treasure: string;
  };
  spells: {
    castingClass: string;
    castingAbility: string;
    saveDice: number;
    bonusAttack: number;
    cantrips: string[];
    slots: {
      level1: LevelSlots;
      level2: LevelSlots;
      level3: LevelSlots;
      level4: LevelSlots;
      level5: LevelSlots;
      level6: LevelSlots;
      level7: LevelSlots;
      level8: LevelSlots;
      level9: LevelSlots;
    };
  };
  user: string;
}

interface Weapon {
  name: string;
  attackBonus: string;
  damageAndType: string;
}

interface LevelSlots {
  total: number;
  expended: number;
  known: KnownSpell[];
}

interface KnownSpell {
  name: string;
  prepared: boolean;
}

interface SavingThrowAndSkills {
  proficiency: boolean;
  bonus: number;
}

interface Stat {
  value: number;
  bonus: number;
}

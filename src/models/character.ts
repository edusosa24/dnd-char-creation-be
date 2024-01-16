import mongoose from 'mongoose';
const { Schema } = mongoose;

const characterSchema = new Schema({
  general: {
    name: String,
    class: String,
    level: Number,
    background: String,
    playerName: String,
    race: String,
    alignment: String,
    experience: Number,
  },
  abilityScore: {
    inspiration: Number,
    proficiencyBonus: Number,
    passiveWisdom: Number,
    stats: {
      strength: Number,
      dexterity: Number,
      constitution: Number,
      intelligence: Number,
      wisdom: Number,
      charisma: Number,
    },
    savingThrows: {
      strength: {
        proficiency: Boolean,
        bonus: Number,
      },
      dexterity: {
        proficiency: Boolean,
        bonus: Number,
      },
      constitution: {
        proficiency: Boolean,
        bonus: Number,
      },
      intelligence: {
        proficiency: Boolean,
        bonus: Number,
      },
      wisdom: {
        proficiency: Boolean,
        bonus: Number,
      },
      charisma: {
        proficiency: Boolean,
        bonus: Number,
      },
    },
    skills: {
      acrobatics: {
        proficiency: Boolean,
        bonus: Number,
      },
      animalHandling: {
        proficiency: Boolean,
        bonus: Number,
      },
      arcana: {
        proficiency: Boolean,
        bonus: Number,
      },
      athletics: {
        proficiency: Boolean,
        bonus: Number,
      },
      deception: {
        proficiency: Boolean,
        bonus: Number,
      },
      history: {
        proficiency: Boolean,
        bonus: Number,
      },
      insight: {
        proficiency: Boolean,
        bonus: Number,
      },
      intimidation: {
        proficiency: Boolean,
        bonus: Number,
      },
      investigation: {
        proficiency: Boolean,
        bonus: Number,
      },
      medicine: {
        proficiency: Boolean,
        bonus: Number,
      },
      nature: {
        proficiency: Boolean,
        bonus: Number,
      },
      perception: {
        proficiency: Boolean,
        bonus: Number,
      },
      performance: {
        proficiency: Boolean,
        bonus: Number,
      },
      persuasion: {
        proficiency: Boolean,
        bonus: Number,
      },
      religion: {
        proficiency: Boolean,
        bonus: Number,
      },
      sleightOfHand: {
        proficiency: Boolean,
        bonus: Number,
      },
      stealth: {
        proficiency: Boolean,
        bonus: Number,
      },
      survival: {
        proficiency: Boolean,
        bonus: Number,
      },
    },
  },
  featuresTraitsAndOtherProficiencies: {
    personalityTraits: String,
    ideals: String,
    bonds: String,
    flaws: String,
    featuresAndTraits: String,
    otherProficienciesAndLanguages: String,
  },
  combat: {
    armorClass: Number,
    initiative: Number,
    speed: Number,
    maxHitPoints: Number,
    currentHitPoints: Number,
    temporaryHitPoints: Number,
    hitDice: String,
    hitDiceTotal: String,
    deathSaves: {
      success: Number,
      failure: Number,
    },
    attacksAndSpellcasting: {
      weapons: {
        type: [
          {
            name: String,
            attackBonus: String,
            damageAndType: String,
          },
        ],
      },
      extra: String,
    },
  },
  equipmentAndMoney: {
    money: {
      copper: Number,
      silver: Number,
      electrum: Number,
      gold: Number,
      platinum: Number,
    },
    equipment: String,
  },
  appearance: {
    age: Number,
    height: String,
    weight: String,
    eyes: String,
    skin: String,
    hair: String,
    portrait: String,
  },
  backstory: {
    backstory: String,
    alliesAndOrganizations: String,
    organizationName: String,
    organizationSymbol: String,
    additionalFeaturesAndTraits: String,
    treasure: String,
  },
  spells: {
    castingClass: String,
    castingAbility: String,
    saveDice: Number,
    bonusAttack: Number,
    cantrips: [String],
    slots: {
      level1: {
        total: Number,
        expended: Number,
        known: [
          {
            name: String,
            prepared: Boolean,
          },
        ],
      },
      level2: {
        total: Number,
        expended: Number,
        known: [
          {
            name: String,
            prepared: Boolean,
          },
        ],
      },
      level3: {
        total: Number,
        expended: Number,
        known: [
          {
            name: String,
            prepared: Boolean,
          },
        ],
      },
      level4: {
        total: Number,
        expended: Number,
        known: [
          {
            name: String,
            prepared: Boolean,
          },
        ],
      },
      level5: {
        total: Number,
        expended: Number,
        known: [
          {
            name: String,
            prepared: Boolean,
          },
        ],
      },
      level6: {
        total: Number,
        expended: Number,
        known: [
          {
            name: String,
            prepared: Boolean,
          },
        ],
      },
      level7: {
        total: Number,
        expended: Number,
        known: [
          {
            name: String,
            prepared: Boolean,
          },
        ],
      },
      level8: {
        total: Number,
        expended: Number,
        known: [
          {
            name: String,
            prepared: Boolean,
          },
        ],
      },
      level9: {
        total: Number,
        expended: Number,
        known: [
          {
            name: String,
            prepared: Boolean,
          },
        ],
      },
    },
  },
});

characterSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;

import { checkSchema, checkExact, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { Character } from '../../../models/character';
import { Error as iError } from '../../interfaces/iError';

const checkExistance = async (characterId: string) => {
  const character = await Character.findById(characterId);
  if (!character) {
    throw new Error('character not found');
  }

  return true;
};

export const validateCharacterExistance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await checkSchema(
    {
      characterId: {
        notEmpty: {
          errorMessage: 'missing character id',
          bail: {
            level: 'request'
          }
        },
        custom: {
          options: checkExistance,
          bail: true
        }
      }
    },
    ['params']
  ).run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const msg: string[] = errors.array().map((er) => `${er.msg}`);
    const error: iError = {
      error: msg,
      status: 404
    };
    next(error);
  }
  next();
};

export const validateCharacter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await checkExact(
    checkSchema(
      {
        /*                                            */
        /*                 GENERAL                    */
        /*                                            */
        general: {
          exists: {
            errorMessage: 'general section is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'general section fields missing',
            bail: true
          },
          isObject: {
            errorMessage: 'general section must be an object',
            bail: true
          }
        },
        'general.name': {
          exists: {
            errorMessage: 'general.name is required',
            bail: true
          },
          isString: {
            errorMessage: 'general.name must be a string',
            bail: true
          },
          isLength: {
            options: { max: 50 },
            errorMessage: 'general.name max length is 50 characters',
            bail: true
          }
        },
        'general.class': {
          exists: {
            errorMessage: 'general.class is required',
            bail: true
          },
          isString: {
            errorMessage: 'general.class must be a string',
            bail: true
          },
          isLength: {
            options: { max: 20 },
            errorMessage: 'general.class max length is 20 characters',
            bail: true
          }
        },
        'general.level': {
          exists: {
            errorMessage: 'general.level is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 999 },
            errorMessage: 'general.level must be between 0 and 999',
            bail: true
          }
        },
        'general.background': {
          exists: {
            errorMessage: 'general.background is required',
            bail: true
          },
          isString: {
            errorMessage: 'general.background must be a string',
            bail: true
          },
          isLength: {
            options: { max: 20 },
            errorMessage: 'general.background max length is 20 characters',
            bail: true
          }
        },
        'general.playerName': {
          exists: {
            errorMessage: 'general.playerName is required',
            bail: true
          },
          isString: {
            errorMessage: 'general.playerName must be a string',
            bail: true
          },
          isLength: {
            options: { max: 20 },
            errorMessage: 'general.playerName max length is 20 characters',
            bail: true
          }
        },
        'general.race': {
          exists: {
            errorMessage: 'general.race is required',
            bail: true
          },
          isString: {
            errorMessage: 'general.race must be a string',
            bail: true
          },
          isLength: {
            options: { max: 20 },
            errorMessage: 'general.race max length is 20 characters',
            bail: true
          }
        },
        'general.alignment': {
          exists: {
            errorMessage: 'general.alignment is required',
            bail: true
          },
          isString: {
            errorMessage: 'general.alignment must be a string',
            bail: true
          },
          isLength: {
            options: { max: 20 },
            errorMessage: 'general.alignment max length is 20 characters',
            bail: true
          }
        },
        'general.experience': {
          exists: {
            errorMessage: 'general.experience is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 999999999999999 },
            errorMessage:
              'general.experience must be between 0 and 999999999999999',
            bail: true
          }
        },
        /*                                            */
        /*                ABILITYSCORE                */
        /*                                            */
        abilityScore: {
          exists: {
            errorMessage: 'abilityScore section is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'abilityScore section fields missing',
            bail: true
          },
          isObject: {
            errorMessage: 'abilityScore section must be an object',
            bail: true
          }
        },
        'abilityScore.inspiration': {
          exists: {
            errorMessage: 'abilityScore.inspiration is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 99 },
            errorMessage: 'abilityScore.inspiration must be between 0 and 99',
            bail: true
          }
        },
        'abilityScore.proficiencyBonus': {
          exists: {
            errorMessage: 'abilityScore.proficiencyBonus is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 99 },
            errorMessage:
              'abilityScore.proficiencyBonus must be between 0 and 99',
            bail: true
          }
        },
        'abilityScore.passiveWisdom': {
          exists: {
            errorMessage: 'abilityScore.passiveWisdom is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 99 },
            errorMessage: 'abilityScore.passiveWisdom must be between 0 and 99',
            bail: true
          }
        },
        'abilityScore.stats': {
          exists: {
            errorMessage: 'abilityScore.stats is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'abilityScore.stats missing fields',
            bail: true
          },
          isObject: {
            errorMessage: 'abilityScore.stats must be an object',
            bail: true
          }
        },
        'abilityScore.savingThrows': {
          exists: {
            errorMessage: 'abilityScore.savingThrows is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'abilityScore.savingThrows missing fields',
            bail: true
          },
          isObject: {
            errorMessage: 'abilityScore.savingThrows must be an object',
            bail: true
          }
        },
        'abilityScore.skills': {
          exists: {
            errorMessage: 'abilityScore.skills is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'abilityScore.skills missing fields',
            bail: true
          },
          isObject: {
            errorMessage: 'abilityScore.skills must be an object',
            bail: true
          }
        },
        'abilityScore.stats.strength': {
          exists: {
            errorMessage: 'abilityScore.skills.strength is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'abilityScore.skills.strength missing fields',
            bail: true
          },
          isObject: {
            errorMessage: 'abilityScore.skills.strength must be an object',
            bail: true
          }
        },
        'abilityScore.stats.dexterity': {
          exists: {
            errorMessage: 'abilityScore.skills.dexterity is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'abilityScore.skills.dexterity missing fields',
            bail: true
          },
          isObject: {
            errorMessage: 'abilityScore.skills.dexterity must be an object',
            bail: true
          }
        },
        'abilityScore.stats.constitution': {
          exists: {
            errorMessage: 'abilityScore.skills.constitution is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'abilityScore.skills.constitution missing fields',
            bail: true
          },
          isObject: {
            errorMessage: 'abilityScore.skills.constitution must be an object',
            bail: true
          }
        },
        'abilityScore.stats.intelligence': {
          exists: {
            errorMessage: 'abilityScore.skills.intelligence is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'abilityScore.skills.intelligence missing fields',
            bail: true
          },
          isObject: {
            errorMessage: 'abilityScore.skills.intelligence must be an object',
            bail: true
          }
        },
        'abilityScore.stats.wisdom': {
          exists: {
            errorMessage: 'abilityScore.skills.wisdom is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'abilityScore.skills.wisdom missing fields',
            bail: true
          },
          isObject: {
            errorMessage: 'abilityScore.skills.wisdom must be an object',
            bail: true
          }
        },
        'abilityScore.stats.charisma': {
          exists: {
            errorMessage: 'abilityScore.skills.charisma is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'abilityScore.skills.charisma missing fields',
            bail: true
          },
          isObject: {
            errorMessage: 'abilityScore.skills.charisma must be an object',
            bail: true
          }
        },
        'abilityScore.stats.*.value': {
          exists: {
            errorMessage: 'abilityScore.stats.[STAT].value is required',
            bail: true
          },
          isInt: {
            options: { min: -99, max: 99 },
            errorMessage:
              'abilityScore.stats.[STAT].value must be between -99 and 99',
            bail: true
          }
        },
        'abilityScore.stats.*.bonus': {
          exists: {
            errorMessage: 'abilityScore.passiveWisdom.[STAT].bonus is required',
            bail: true
          },
          isInt: {
            options: { min: -99, max: 99 },
            errorMessage:
              'abilityScore.passiveWisdom.[STAT].bonus must be between -99 and 99',
            bail: true
          }
        },
        'abilityScore.savingThrows.strength': {
          exists: {
            errorMessage: 'abilityScore.savingThrows.strength is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'abilityScore.savingThrows.strength missing fields',
            bail: true
          },
          isObject: {
            errorMessage:
              'abilityScore.savingThrows.strength must be an object',
            bail: true
          }
        },
        'abilityScore.savingThrows.dexterity': {
          exists: {
            errorMessage: 'abilityScore.savingThrows.dexterity is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'abilityScore.savingThrows.dexterity missing fields',
            bail: true
          },
          isObject: {
            errorMessage:
              'abilityScore.savingThrows.dexterity must be an object',
            bail: true
          }
        },
        'abilityScore.savingThrows.constitution': {
          exists: {
            errorMessage: 'abilityScore.savingThrows.constitution is required',
            bail: true
          },
          notEmpty: {
            errorMessage:
              'abilityScore.savingThrows.constitution missing fields',
            bail: true
          },
          isObject: {
            errorMessage:
              'abilityScore.savingThrows.constitution must be an object',
            bail: true
          }
        },
        'abilityScore.savingThrows.intelligence': {
          exists: {
            errorMessage: 'abilityScore.savingThrows.intelligence is required',
            bail: true
          },
          notEmpty: {
            errorMessage:
              'abilityScore.savingThrows.intelligence missing fields',
            bail: true
          },
          isObject: {
            errorMessage:
              'abilityScore.savingThrows.intelligence must be an object',
            bail: true
          }
        },
        'abilityScore.savingThrows.wisdom': {
          exists: {
            errorMessage: 'abilityScore.savingThrows.wisdom is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'abilityScore.savingThrows.wisdom missing fields',
            bail: true
          },
          isObject: {
            errorMessage: 'abilityScore.savingThrows.wisdom must be an object',
            bail: true
          }
        },
        'abilityScore.savingThrows.charisma': {
          exists: {
            errorMessage: 'abilityScore.savingThrows.charisma is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'abilityScore.savingThrows.charisma missing fields',
            bail: true
          },
          isObject: {
            errorMessage:
              'abilityScore.savingThrows.charisma must be an object',
            bail: true
          }
        },
        'abilityScore.skills.acrobatics': {
          exists: {
            errorMessage: 'abilityScore.skills.acrobatics is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'abilityScore.skills.acrobatics missing fields',
            bail: true
          },
          isObject: {
            errorMessage: 'abilityScore.skills.acrobatics must be an object',
            bail: true
          }
        },
        'abilityScore.skills.animalHandling': {
          exists: {
            errorMessage: 'abilityScore.skills.animalHandling is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'abilityScore.skills.animalHandling missing fields',
            bail: true
          },
          isObject: {
            errorMessage:
              'abilityScore.skills.animalHandling must be an object',
            bail: true
          }
        },
        'abilityScore.skills.arcana': {
          exists: {
            errorMessage: 'abilityScore.skills.arcana is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'abilityScore.skills.arcana missing fields',
            bail: true
          },
          isObject: {
            errorMessage: 'abilityScore.skills.arcana must be an object',
            bail: true
          }
        },
        'abilityScore.skills.athletics': {
          exists: {
            errorMessage: 'abilityScore.skills.athletics is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'abilityScore.skills.athletics missing fields',
            bail: true
          },
          isObject: {
            errorMessage: 'abilityScore.skills.athletics must be an object',
            bail: true
          }
        },
        'abilityScore.skills.deception': {
          exists: {
            errorMessage: 'abilityScore.skills.deception is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'abilityScore.skills.deception missing fields',
            bail: true
          },
          isObject: {
            errorMessage: 'abilityScore.skills.deception must be an object',
            bail: true
          }
        },
        'abilityScore.skills.history': {
          exists: {
            errorMessage: 'abilityScore.skills.history is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'abilityScore.skills.history missing fields',
            bail: true
          },
          isObject: {
            errorMessage: 'abilityScore.skills.history must be an object',
            bail: true
          }
        },
        'abilityScore.skills.insight': {
          exists: {
            errorMessage: 'abilityScore.skills.insight is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'abilityScore.skills.insight missing fields',
            bail: true
          },
          isObject: {
            errorMessage: 'abilityScore.skills.insight must be an object',
            bail: true
          }
        },
        'abilityScore.skills.intimidation': {
          exists: {
            errorMessage: 'abilityScore.skills.intimidation is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'abilityScore.skills.intimidation missing fields',
            bail: true
          },
          isObject: {
            errorMessage: 'abilityScore.skills.intimidation must be an object',
            bail: true
          }
        },
        'abilityScore.skills.investigation': {
          exists: {
            errorMessage: 'abilityScore.skills.investigation is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'abilityScore.skills.investigation missing fields',
            bail: true
          },
          isObject: {
            errorMessage: 'abilityScore.skills.investigation must be an object',
            bail: true
          }
        },
        'abilityScore.skills.medicine': {
          exists: {
            errorMessage: 'aabilityScore.skills.medicine is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'aabilityScore.skills.medicine missing fields',
            bail: true
          },
          isObject: {
            errorMessage: 'aabilityScore.skills.medicine must be an object',
            bail: true
          }
        },
        'abilityScore.skills.nature': {
          exists: {
            errorMessage: 'abilityScore.skills.nature is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'abilityScore.skills.nature missing fields',
            bail: true
          },
          isObject: {
            errorMessage: 'abilityScore.skills.nature must be an object',
            bail: true
          }
        },
        'abilityScore.skills.perception': {
          exists: {
            errorMessage: 'abilityScore.skills.perception is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'abilityScore.skills.perception missing fields',
            bail: true
          },
          isObject: {
            errorMessage: 'abilityScore.skills.perception must be an object',
            bail: true
          }
        },
        'abilityScore.skills.performance': {
          exists: {
            errorMessage: 'abilityScore.skills.performance is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'abilityScore.skills.performance missing fields',
            bail: true
          },
          isObject: {
            errorMessage: 'abilityScore.skills.performance must be an object',
            bail: true
          }
        },
        'abilityScore.skills.persuasion': {
          exists: {
            errorMessage: 'abilityScore.skills.persuasion is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'abilityScore.skills.persuasion missing fields',
            bail: true
          },
          isObject: {
            errorMessage: 'abilityScore.skills.persuasion must be an object',
            bail: true
          }
        },
        'abilityScore.skills.religion': {
          exists: {
            errorMessage: 'abilityScore.skills.religion is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'abilityScore.skills.religion missing fields',
            bail: true
          },
          isObject: {
            errorMessage: 'abilityScore.skills.religion must be an object',
            bail: true
          }
        },
        'abilityScore.skills.sleightOfHand': {
          exists: {
            errorMessage: 'abilityScore.skills.sleightOfHand is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'abilityScore.skills.sleightOfHand missing fields',
            bail: true
          },
          isObject: {
            errorMessage: 'abilityScore.skills.sleightOfHand must be an object',
            bail: true
          }
        },
        'abilityScore.skills.stealth': {
          exists: {
            errorMessage: 'abilityScore.skills.stealth is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'abilityScore.skills.stealth missing fields',
            bail: true
          },
          isObject: {
            errorMessage: 'abilityScore.skills.stealth must be an object',
            bail: true
          }
        },
        'abilityScore.skills.survival': {
          exists: {
            errorMessage: 'abilityScore.skills.survival is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'abilityScore.skills.survival missing fields',
            bail: true
          },
          isObject: {
            errorMessage: 'abilityScore.skills.survival must be an object',
            bail: true
          }
        },
        'abilityScore.savingThrows.strength.proficiency': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.strength.proficiency is required',
            bail: true
          },
          isBoolean: {
            errorMessage:
              'abilityScore.savingThrows.strength.proficiency must be true or false',
            bail: true
          }
        },
        'abilityScore.savingThrows.strength.bonus': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.strength.bonus is required',
            bail: true
          },
          isInt: {
            options: { min: -99, max: 99 },
            errorMessage:
              'abilityScore.savingThrows.strength.bonus must be between -99 and 99',
            bail: true
          }
        },
        'abilityScore.savingThrows.dexterity.proficiency': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.dexterity.proficiency is required',
            bail: true
          },
          isBoolean: {
            errorMessage:
              'abilityScore.savingThrows.dexterity.proficiency must be true or false',
            bail: true
          }
        },
        'abilityScore.savingThrows.dexterity.bonus': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.dexterity.bonus is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 99 },
            errorMessage:
              'abilityScore.savingThrows.dexterity.bonus must be between 0 and 99',
            bail: true
          }
        },
        'abilityScore.savingThrows.constitution.proficiency': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.constitution.proficiency is required',
            bail: true
          },
          isBoolean: {
            errorMessage:
              'abilityScore.savingThrows.constitution.proficiency must be true or false',
            bail: true
          }
        },
        'abilityScore.savingThrows.constitution.bonus': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.constitution.bonus is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 99 },
            errorMessage:
              'abilityScore.savingThrows.constitution.bonus must be between 0 and 99',
            bail: true
          }
        },
        'abilityScore.savingThrows.intelligence.proficiency': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.intelligence.proficiency is required',
            bail: true
          },
          isBoolean: {
            errorMessage:
              'abilityScore.savingThrows.intelligence.proficiency must be true or false',
            bail: true
          }
        },
        'abilityScore.savingThrows.intelligence.bonus': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.intelligence.bonus is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 99 },
            errorMessage:
              'abilityScore.savingThrows.intelligence.bonus must be between 0 and 99',
            bail: true
          }
        },
        'abilityScore.savingThrows.wisdom.proficiency': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.wisdom.proficiency is required',
            bail: true
          },
          isBoolean: {
            errorMessage:
              'abilityScore.savingThrows.wisdom.proficiency must be true or false',
            bail: true
          }
        },
        'abilityScore.savingThrows.wisdom.bonus': {
          exists: {
            errorMessage: 'abilityScore.savingThrows.wisdom.bonus is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 99 },
            errorMessage:
              'abilityScore.savingThrows.wisdom.bonus must be between 0 and 99',
            bail: true
          }
        },
        'abilityScore.savingThrows.charisma.proficiency': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency is required',
            bail: true
          },
          isBoolean: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency must be true or false',
            bail: true
          }
        },
        'abilityScore.savingThrows.charisma.bonus': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.charisma.bonus is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 99 },
            errorMessage:
              'abilityScore.savingThrows.charisma.bonus must be between 0 and 99',
            bail: true
          }
        },
        'abilityScore.skills.acrobatics.proficiency': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency is required',
            bail: true
          },
          isBoolean: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency must be true or false',
            bail: true
          }
        },
        'abilityScore.skills.animalHandling.proficiency': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency is required',
            bail: true
          },
          isBoolean: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency must be true or false',
            bail: true
          }
        },
        'abilityScore.skills.arcana.proficiency': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency is required',
            bail: true
          },
          isBoolean: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency must be true or false',
            bail: true
          }
        },
        'abilityScore.skills.athletics.proficiency': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency is required',
            bail: true
          },
          isBoolean: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency must be true or false',
            bail: true
          }
        },
        'abilityScore.skills.deception.proficiency': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency is required',
            bail: true
          },
          isBoolean: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency must be true or false',
            bail: true
          }
        },
        'abilityScore.skills.history.proficiency': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency is required',
            bail: true
          },
          isBoolean: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency must be true or false',
            bail: true
          }
        },
        'abilityScore.skills.insight.proficiency': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency is required',
            bail: true
          },
          isBoolean: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency must be true or false',
            bail: true
          }
        },
        'abilityScore.skills.intimidation.proficiency': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency is required',
            bail: true
          },
          isBoolean: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency must be true or false',
            bail: true
          }
        },
        'abilityScore.skills.investigation.proficiency': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency is required',
            bail: true
          },
          isBoolean: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency must be true or false',
            bail: true
          }
        },
        'abilityScore.skills.medicine.proficiency': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency is required',
            bail: true
          },
          isBoolean: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency must be true or false',
            bail: true
          }
        },
        'abilityScore.skills.nature.proficiency': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency is required',
            bail: true
          },
          isBoolean: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency must be true or false',
            bail: true
          }
        },
        'abilityScore.skills.perception.proficiency': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency is required',
            bail: true
          },
          isBoolean: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency must be true or false',
            bail: true
          }
        },
        'abilityScore.skills.performance.proficiency': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency is required',
            bail: true
          },
          isBoolean: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency must be true or false',
            bail: true
          }
        },
        'abilityScore.skills.persuasion.proficiency': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency is required',
            bail: true
          },
          isBoolean: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency must be true or false',
            bail: true
          }
        },
        'abilityScore.skills.religion.proficiency': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency is required',
            bail: true
          },
          isBoolean: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency must be true or false',
            bail: true
          }
        },
        'abilityScore.skills.sleightOfHand.proficiency': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency is required',
            bail: true
          },
          isBoolean: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency must be true or false',
            bail: true
          }
        },
        'abilityScore.skills.stealth.proficiency': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency is required',
            bail: true
          },
          isBoolean: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency must be true or false',
            bail: true
          }
        },
        'abilityScore.skills.survival.proficiency': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency is required',
            bail: true
          },
          isBoolean: {
            errorMessage:
              'abilityScore.savingThrows.charisma.proficiency must be true or false',
            bail: true
          }
        },
        'abilityScore.skills.acrobatics.bonus': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.strength.bonus is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 99 },
            errorMessage:
              'abilityScore.savingThrows.strength.bonus must be between 0 and 99',
            bail: true
          }
        },
        'abilityScore.skills.animalHandling.bonus': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.strength.bonus is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 99 },
            errorMessage:
              'abilityScore.savingThrows.strength.bonus must be between 0 and 99',
            bail: true
          }
        },
        'abilityScore.skills.arcana.bonus': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.strength.bonus is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 99 },
            errorMessage:
              'abilityScore.savingThrows.strength.bonus must be between 0 and 99',
            bail: true
          }
        },
        'abilityScore.skills.athletics.bonus': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.strength.bonus is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 99 },
            errorMessage:
              'abilityScore.savingThrows.strength.bonus must be between 0 and 99',
            bail: true
          }
        },
        'abilityScore.skills.deception.bonus': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.strength.bonus is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 99 },
            errorMessage:
              'abilityScore.savingThrows.strength.bonus must be between 0 and 99',
            bail: true
          }
        },
        'abilityScore.skills.history.bonus': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.strength.bonus is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 99 },
            errorMessage:
              'abilityScore.savingThrows.strength.bonus must be between 0 and 99',
            bail: true
          }
        },
        'abilityScore.skills.insight.bonus': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.strength.bonus is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 99 },
            errorMessage:
              'abilityScore.savingThrows.strength.bonus must be between 0 and 99',
            bail: true
          }
        },
        'abilityScore.skills.intimidation.bonus': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.strength.bonus is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 99 },
            errorMessage:
              'abilityScore.savingThrows.strength.bonus must be between 0 and 99',
            bail: true
          }
        },
        'abilityScore.skills.investigation.bonus': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.strength.bonus is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 99 },
            errorMessage:
              'abilityScore.savingThrows.strength.bonus must be between 0 and 99',
            bail: true
          }
        },
        'abilityScore.skills.medicine.bonus': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.strength.bonus is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 99 },
            errorMessage:
              'abilityScore.savingThrows.strength.bonus must be between 0 and 99',
            bail: true
          }
        },
        'abilityScore.skills.nature.bonus': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.strength.bonus is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 99 },
            errorMessage:
              'abilityScore.savingThrows.strength.bonus must be between 0 and 99',
            bail: true
          }
        },
        'abilityScore.skills.perception.bonus': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.strength.bonus is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 99 },
            errorMessage:
              'abilityScore.savingThrows.strength.bonus must be between 0 and 99',
            bail: true
          }
        },
        'abilityScore.skills.performance.bonus': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.strength.bonus is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 99 },
            errorMessage:
              'abilityScore.savingThrows.strength.bonus must be between 0 and 99',
            bail: true
          }
        },
        'abilityScore.skills.persuasion.bonus': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.strength.bonus is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 99 },
            errorMessage:
              'abilityScore.savingThrows.strength.bonus must be between 0 and 99',
            bail: true
          }
        },
        'abilityScore.skills.religion.bonus': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.strength.bonus is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 99 },
            errorMessage:
              'abilityScore.savingThrows.strength.bonus must be between 0 and 99',
            bail: true
          }
        },
        'abilityScore.skills.sleightOfHand.bonus': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.strength.bonus is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 99 },
            errorMessage:
              'abilityScore.savingThrows.strength.bonus must be between 0 and 99',
            bail: true
          }
        },
        'abilityScore.skills.stealth.bonus': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.strength.bonus is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 99 },
            errorMessage:
              'abilityScore.savingThrows.strength.bonus must be between 0 and 99',
            bail: true
          }
        },
        'abilityScore.skills.survival.bonus': {
          exists: {
            errorMessage:
              'abilityScore.savingThrows.strength.bonus is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 99 },
            errorMessage:
              'abilityScore.savingThrows.strength.bonus must be between 0 and 99',
            bail: true
          }
        },
        /*                                            */
        /*    FEATURESTRAITSANDOTHERPROFICIENCIES     */
        /*                                            */
        featuresTraitsAndOtherProficiencies: {
          exists: {
            errorMessage:
              'featuresTraitsAndOtherProficiencies section is required',
            bail: true
          },
          notEmpty: {
            errorMessage:
              'featuresTraitsAndOtherProficiencies section fields missing',
            bail: true
          },
          isObject: {
            errorMessage:
              'featuresTraitsAndOtherProficiencies section must be an object',
            bail: true
          }
        },
        'featuresTraitsAndOtherProficiencies.personalityTraits': {
          exists: {
            errorMessage:
              'featuresTraitsAndOtherProficiencies.personalityTraits is required',
            bail: true
          },
          isString: {
            errorMessage:
              'featuresTraitsAndOtherProficiencies.personalityTraits must be a string',
            bail: true
          },
          isLength: {
            options: { max: 90 },
            errorMessage:
              'featuresTraitsAndOtherProficiencies.personalityTraits max length is 90 characters',
            bail: true
          }
        },
        'featuresTraitsAndOtherProficiencies.ideals': {
          exists: {
            errorMessage:
              'featuresTraitsAndOtherProficiencies.ideals is required',
            bail: true
          },
          isString: {
            errorMessage:
              'featuresTraitsAndOtherProficiencies.ideals must be a string',
            bail: true
          },
          isLength: {
            options: { max: 60 },
            errorMessage:
              'featuresTraitsAndOtherProficiencies.ideals max length is 60 characters',
            bail: true
          }
        },
        'featuresTraitsAndOtherProficiencies.bonds': {
          exists: {
            errorMessage:
              'featuresTraitsAndOtherProficiencies.bonds is required',
            bail: true
          },
          isString: {
            errorMessage:
              'featuresTraitsAndOtherProficiencies.bonds must be a string',
            bail: true
          },
          isLength: {
            options: { max: 60 },
            errorMessage:
              'featuresTraitsAndOtherProficiencies.bonds max length is 60 characters',
            bail: true
          }
        },
        'featuresTraitsAndOtherProficiencies.flaws': {
          exists: {
            errorMessage:
              'featuresTraitsAndOtherProficiencies.flaws is required',
            bail: true
          },
          isString: {
            errorMessage:
              'featuresTraitsAndOtherProficiencies.flaws must be a string',
            bail: true
          },
          isLength: {
            options: { max: 60 },
            errorMessage:
              'featuresTraitsAndOtherProficiencies.flaws max length is 60 characters',
            bail: true
          }
        },
        'featuresTraitsAndOtherProficiencies.featuresAndTraits': {
          exists: {
            errorMessage:
              'featuresTraitsAndOtherProficiencies.featuresAndTraits is required',
            bail: true
          },
          isString: {
            errorMessage:
              'featuresTraitsAndOtherProficiencies.featuresAndTraits must be a string',
            bail: true
          },
          isLength: {
            options: { max: 800 },
            errorMessage:
              'featuresTraitsAndOtherProficiencies.featuresAndTraits max length is 800 characters',
            bail: true
          }
        },
        'featuresTraitsAndOtherProficiencies.otherProficienciesAndLanguages': {
          exists: {
            errorMessage:
              'featuresTraitsAndOtherProficiencies.otherProficienciesAndLanguages is required',
            bail: true
          },
          isString: {
            errorMessage:
              'featuresTraitsAndOtherProficiencies.otherProficienciesAndLanguages must be a string',
            bail: true
          },
          isLength: {
            options: { max: 250 },
            errorMessage:
              'featuresTraitsAndOtherProficiencies.otherProficienciesAndLanguages max length is 250 characters',
            bail: true
          }
        },
        /*                                            */
        /*                    COMBAT                  */
        /*                                            */
        combat: {
          exists: {
            errorMessage: 'combat section is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'combat section fields missing',
            bail: true
          },
          isObject: {
            errorMessage: 'combat section must be an object',
            bail: true
          }
        },
        'combat.armorClass': {
          exists: {
            errorMessage: 'combat.armorClass is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 99 },
            errorMessage: 'combat.armorClass must be between 0 and 99',
            bail: true
          }
        },
        'combat.initiative': {
          exists: {
            errorMessage: 'combat.initiative is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 99 },
            errorMessage: 'combat.initiative must be between 0 and 99',
            bail: true
          }
        },
        'combat.speed': {
          exists: {
            errorMessage: 'combat.speed is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 99 },
            errorMessage: 'combat.speed must be between 0 and 99',
            bail: true
          }
        },
        'combat.maxHitPoints': {
          exists: {
            errorMessage: 'combat.maxHitPoints is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 9999 },
            errorMessage: 'combat.maxHitPoints must be between 0 and 9999',
            bail: true
          }
        },
        'combat.currentHitPoints': {
          exists: {
            errorMessage: 'combat.currentHitPoints is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 9999 },
            errorMessage: 'combat.currentHitPoints must be between 0 and 9999',
            bail: true
          }
        },
        'combat.temporaryHitPoints': {
          exists: {
            errorMessage: 'combat.temporaryHitPoints is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 9999 },
            errorMessage:
              'combat.temporaryHitPoints must be between 0 and 9999',
            bail: true
          }
        },
        'combat.hitDice': {
          exists: {
            errorMessage: 'combat.hitDice is required',
            bail: true
          },
          isString: {
            errorMessage: 'combat.hitDice must be a string',
            bail: true
          },
          isLength: {
            options: { max: 15 },
            errorMessage: 'combat.hitDice max length is 15 characters',
            bail: true
          }
        },
        'combat.hitDiceTotal': {
          exists: {
            errorMessage: 'combat.hitDiceTotal is required',
            bail: true
          },
          isString: {
            errorMessage: 'combat.hitDiceTotal must be a string',
            bail: true
          },
          isLength: {
            options: { max: 10 },
            errorMessage: 'combat.hitDiceTotal max length is 10 characters',
            bail: true
          }
        },
        'combat.deathSaves': {
          exists: {
            errorMessage: 'combat.deathSaves is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'combat.deathSaves fields missing',
            bail: true
          },
          isObject: {
            errorMessage: 'combat.deathSaves must be an object',
            bail: true
          }
        },
        'combat.deathSaves.success': {
          exists: {
            errorMessage: 'combat.deathSaves.success is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 3 },
            errorMessage: 'combat.deathSaves.success must be between 0 and 3',
            bail: true
          }
        },
        'combat.deathSaves.failure': {
          exists: {
            errorMessage: 'combat.deathSaves.failure is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 3 },
            errorMessage: 'combat.deathSaves.failure must be between 0 and 3',
            bail: true
          }
        },
        'combat.attacksAndSpellcasting': {
          exists: {
            errorMessage: 'combat.attacksAndSpellcasting is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'combat.attacksAndSpellcasting fields missing',
            bail: true
          },
          isObject: {
            errorMessage: 'combat.attacksAndSpellcasting must be an object',
            bail: true
          }
        },
        'combat.attacksAndSpellcasting.weapons': {
          exists: {
            errorMessage: 'combat.attacksAndSpellcasting.weapons is required',
            bail: true
          },
          isArray: {
            options: { min: 3, max: 3 },
            errorMessage:
              'combat.attacksAndSpellcasting.weapons should be length 3',
            bail: true
          }
        },
        'combat.attacksAndSpellcasting.extra': {
          exists: {
            errorMessage: 'combat.attacksAndSpellcasting.extra is required',
            bail: true
          },
          isString: {
            errorMessage:
              'combat.attacksAndSpellcasting.extra must be a string',
            bail: true
          },
          isLength: {
            options: { max: 600 },
            errorMessage:
              'combat.attacksAndSpellcasting.extra max length is 600 characters',
            bail: true
          }
        },
        'combat.*.*.*.name': {
          exists: {
            errorMessage:
              'combat.attacksAndSpellcasting.Weapons.[WEAPON].name is required',
            bail: true
          },
          isString: {
            errorMessage:
              'combat.attacksAndSpellcasting.Weapons.[WEAPON].name must be a string',
            bail: true
          },
          isLength: {
            options: { max: 22 },
            errorMessage:
              'combat.attacksAndSpellcasting.Weapons.[WEAPON].name max length is 22 characters',
            bail: true
          }
        },
        'combat.*.*.*.attackBonus': {
          exists: {
            errorMessage:
              'combat.attacksAndSpellcasting.Weapons.[WEAPON].attackBonus is required',
            bail: true
          },
          isString: {
            errorMessage:
              'combat.attacksAndSpellcasting.Weapons.[WEAPON].attackBonus must be a string',
            bail: true
          },
          isLength: {
            options: { max: 11 },
            errorMessage:
              'combat.attacksAndSpellcasting.Weapons.[WEAPON].attackBonus max length is 11 characters',
            bail: true
          }
        },
        'combat.*.*.*.damageAndType': {
          exists: {
            errorMessage:
              'combat.attacksAndSpellcasting.Weapons.[WEAPON].damageAndType is required',
            bail: true
          },
          isString: {
            errorMessage:
              'combat.attacksAndSpellcasting.Weapons.[WEAPON].damageAndType must be a string',
            bail: true
          },
          isLength: {
            options: { max: 22 },
            errorMessage:
              'combat.attacksAndSpellcasting.Weapons.[WEAPON].damageAndType max length is 22 characters',
            bail: true
          }
        },
        /*                                            */
        /*             EQUIPMENTANDMONEY              */
        /*                                            */
        equipmentAndMoney: {
          exists: {
            errorMessage: 'equipmentAndMoney section is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'equipmentAndMoney section fields missing',
            bail: true
          },
          isObject: {
            errorMessage: 'equipmentAndMoney section must be an object',
            bail: true
          }
        },
        'equipmentAndMoney.money': {
          exists: {
            errorMessage: 'equipmentAndMoney.money is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'equipmentAndMoney.money fields missing',
            bail: true
          },
          isObject: {
            errorMessage: 'equipmentAndMoney.money must be an object',
            bail: true
          }
        },
        'equipmentAndMoney.money.copper': {
          exists: {
            errorMessage: 'equipmentAndMoney.money.copper is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 999 },
            errorMessage:
              'equipmentAndMoney.money.copper must be between 0 and 999',
            bail: true
          }
        },
        'equipmentAndMoney.money.silver': {
          exists: {
            errorMessage: 'equipmentAndMoney.money.silver is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 999 },
            errorMessage:
              'equipmentAndMoney.money.silver must be between 0 and 999',
            bail: true
          }
        },
        'equipmentAndMoney.money.electrum': {
          exists: {
            errorMessage: 'equipmentAndMoney.money.electrum is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 999 },
            errorMessage:
              'equipmentAndMoney.money.electrum must be between 0 and 999',
            bail: true
          }
        },
        'equipmentAndMoney.money.gold': {
          exists: {
            errorMessage: 'equipmentAndMoney.money.gold is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 999 },
            errorMessage:
              'equipmentAndMoney.money.gold must be between 0 and 999',
            bail: true
          }
        },
        'equipmentAndMoney.money.platinum': {
          exists: {
            errorMessage: 'equipmentAndMoney.money.platinum is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 999 },
            errorMessage:
              'equipmentAndMoney.money.platinum must be between 0 and 999',
            bail: true
          }
        },
        'equipmentAndMoney.equipment': {
          exists: {
            errorMessage: 'equipmentAndMoney.equipment is required',
            bail: true
          },
          isString: {
            errorMessage: 'equipmentAndMoney.equipment must be a string',
            bail: true
          },
          isLength: {
            options: { max: 1000 },
            errorMessage:
              'equipmentAndMoney.equipment max length is 1000 characters',
            bail: true
          }
        },
        /*                                            */
        /*                 APPEARANCE                 */
        /*                                            */
        appearance: {
          exists: {
            errorMessage: 'appearance section is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'appearance section fields missing',
            bail: true
          },
          isObject: {
            errorMessage: 'appearance section must be an object',
            bail: true
          }
        },
        'appearance.age': {
          exists: {
            errorMessage: 'appearance.age is required',
            bail: true
          },
          isString: {
            errorMessage: 'appearance.age must be a string',
            bail: true
          },
          isLength: {
            options: { max: 20 },
            errorMessage: 'appearance.age max length is 20 characters',
            bail: true
          }
        },
        'appearance.height': {
          exists: {
            errorMessage: 'appearance.height is required',
            bail: true
          },
          isString: {
            errorMessage: 'appearance.height must be a string',
            bail: true
          },
          isLength: {
            options: { max: 20 },
            errorMessage: 'appearance.height max length is 20 characters',
            bail: true
          }
        },
        'appearance.weight': {
          exists: {
            errorMessage: 'appearance.weight is required',
            bail: true
          },
          isString: {
            errorMessage: 'appearance.weight must be a string',
            bail: true
          },
          isLength: {
            options: { max: 20 },
            errorMessage: 'appearance.weight max length is 20 characters',
            bail: true
          }
        },
        'appearance.eyes': {
          exists: {
            errorMessage: 'appearance.eyes is required',
            bail: true
          },
          isString: {
            errorMessage: 'appearance.eyes must be a string',
            bail: true
          },
          isLength: {
            options: { max: 20 },
            errorMessage: 'appearance.eyes max length is 20 characters',
            bail: true
          }
        },
        'appearance.skin': {
          exists: {
            errorMessage: 'appearance.skin is required',
            bail: true
          },
          isString: {
            errorMessage: 'appearance.skin must be a string',
            bail: true
          },
          isLength: {
            options: { max: 20 },
            errorMessage: 'appearance.skin max length is 20 characters',
            bail: true
          }
        },
        'appearance.hair': {
          exists: {
            errorMessage: 'appearance.hair is required',
            bail: true
          },
          isString: {
            errorMessage: 'appearance.hair must be a string',
            bail: true
          },
          isLength: {
            options: { max: 20 },
            errorMessage: 'appearance.hair max length is 20 characters',
            bail: true
          }
        },
        'appearance.portrait': {
          exists: {
            errorMessage: 'appearance.portrait is required',
            bail: true
          },
          isString: {
            errorMessage: 'appearance.portrait must be a string',
            bail: true
          }
        },
        /*                                            */
        /*                  BACKSTORY                 */
        /*                                            */
        backstory: {
          exists: {
            errorMessage: 'backstory section is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'backstory section fields missing',
            bail: true
          },
          isObject: {
            errorMessage: 'backstory section must be an object',
            bail: true
          }
        },
        'backstory.backstory': {
          exists: {
            errorMessage: 'backstory.backstory is required',
            bail: true
          },
          isString: {
            errorMessage: 'backstory.backstory must be a string',
            bail: true
          },
          isLength: {
            options: { max: 800 },
            errorMessage: 'backstory.backstory max length is 800 characters',
            bail: true
          }
        },
        'backstory.alliesAndOrganizations': {
          exists: {
            errorMessage: 'abackstory.alliesAndOrganizations is required',
            bail: true
          },
          isString: {
            errorMessage: 'abackstory.alliesAndOrganizations must be a string',
            bail: true
          },
          isLength: {
            options: { max: 500 },
            errorMessage:
              'abackstory.alliesAndOrganizations max length is 500 characters',
            bail: true
          }
        },
        'backstory.organizationName': {
          exists: {
            errorMessage: 'backstory.organizationName is required',
            bail: true
          },
          isString: {
            errorMessage: 'backstory.organizationName must be a string',
            bail: true
          },
          isLength: {
            options: { max: 25 },
            errorMessage:
              'backstory.organizationName max length is 25 characters',
            bail: true
          }
        },
        'backstory.organizationSymbol': {
          exists: {
            errorMessage: 'backstory.organizationSymbol is required',
            bail: true
          },
          isString: {
            errorMessage: 'backstory.organizationSymbol must be a string',
            bail: true
          }
        },
        'backstory.additionalFeaturesAndTraits': {
          exists: {
            errorMessage: 'backstory.additionalFeaturesAndTraits is required',
            bail: true
          },
          isString: {
            errorMessage:
              'backstory.additionalFeaturesAndTraits must be a string',
            bail: true
          },
          isLength: {
            options: { max: 900 },
            errorMessage:
              'backstory.additionalFeaturesAndTraits max length is 900 characters',
            bail: true
          }
        },
        'backstory.treasure': {
          exists: {
            errorMessage: 'backstory.treasure is required',
            bail: true
          },
          isString: {
            errorMessage: 'backstory.treasure must be a string',
            bail: true
          },
          isLength: {
            options: { max: 650 },
            errorMessage: 'backstory.treasure max length is 650 characters',
            bail: true
          }
        },
        /*                                            */
        /*                    SPELLS                  */
        /*                                            */
        spells: {
          exists: {
            errorMessage: 'spells section is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'spells section fields missing',
            bail: true
          },
          isObject: {
            errorMessage: 'spells section must be an object',
            bail: true
          }
        },
        'spells.castingClass': {
          exists: {
            errorMessage: 'spells.castingClass is required',
            bail: true
          },
          isString: {
            errorMessage: 'spells.castingClass must be a string',
            bail: true
          },
          isLength: {
            options: { max: 30 },
            errorMessage: 'spells.castingClass max length is 30 characters',
            bail: true
          }
        },
        'spells.castingAbility': {
          exists: {
            errorMessage: 'spells.castingAbility is required',
            bail: true
          },
          isString: {
            errorMessage: 'spells.castingAbility must be a string',
            bail: true
          },
          isLength: {
            options: { max: 5 },
            errorMessage: 'spells.castingAbility max length is 5 characters',
            bail: true
          }
        },
        'spells.saveDice': {
          exists: {
            errorMessage: 'spells.saveDice is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 9999 },
            errorMessage: 'spells.saveDice must be between 0 and 9999',
            bail: true
          }
        },
        'spells.bonusAttack': {
          exists: {
            errorMessage: 'spells.bonusAttack is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 9999 },
            errorMessage: 'spells.bonusAttack must be between 0 and 9999',
            bail: true
          }
        },
        'spells.cantrips': {
          exists: {
            errorMessage: 'spells.cantrips is required',
            bail: true
          },
          isArray: {
            options: { min: 8, max: 8 },
            errorMessage: 'spells.cantrips should be length 8',
            bail: true
          }
        },
        'spells.slots': {
          exists: {
            errorMessage: 'spells.slots is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'spells.slots missing fields',
            bail: true
          },
          isObject: {
            errorMessage: 'spells.slots must be an object',
            bail: true
          }
        },
        'spells.slots.level1': {
          exists: {
            errorMessage: 'spells.slots.level1 is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'spells.slots.level1 missing fields',
            bail: true
          },
          isObject: {
            errorMessage: 'spells.slots.level1 must be an object',
            bail: true
          }
        },
        'spells.slots.level2': {
          exists: {
            errorMessage: 'spells.slots.level2 is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'spells.slots.level2 missing fields',
            bail: true
          },
          isObject: {
            errorMessage: 'spells.slots.level2 must be an object',
            bail: true
          }
        },
        'spells.slots.level3': {
          exists: {
            errorMessage: 'spells.slots.level3 is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'spells.slots.level3 missing fields',
            bail: true
          },
          isObject: {
            errorMessage: 'spells.slots.level3 must be an object',
            bail: true
          }
        },
        'spells.slots.level4': {
          exists: {
            errorMessage: 'spells.slots.level4 is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'spells.slots.level4 missing fields',
            bail: true
          },
          isObject: {
            errorMessage: 'spells.slots.level4 must be an object',
            bail: true
          }
        },
        'spells.slots.level5': {
          exists: {
            errorMessage: 'spells.slots.level5 is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'spells.slots.level5 missing fields',
            bail: true
          },
          isObject: {
            errorMessage: 'spells.slots.level5 must be an object',
            bail: true
          }
        },
        'spells.slots.level6': {
          exists: {
            errorMessage: 'spells.slots.level6 is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'spells.slots.level6 missing fields',
            bail: true
          },
          isObject: {
            errorMessage: 'spells.slots.level6 must be an object',
            bail: true
          }
        },
        'spells.slots.level7': {
          exists: {
            errorMessage: 'spells.slots.level7 is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'spells.slots.level7 missing fields',
            bail: true
          },
          isObject: {
            errorMessage: 'spells.slots.level7 must be an object',
            bail: true
          }
        },
        'spells.slots.level8': {
          exists: {
            errorMessage: 'spells.slots.level8 is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'spells.slots.level8 missing fields',
            bail: true
          },
          isObject: {
            errorMessage: 'spells.slots.level8 must be an object',
            bail: true
          }
        },
        'spells.slots.level9': {
          exists: {
            errorMessage: 'spells.slots.level9 is required',
            bail: true
          },
          notEmpty: {
            errorMessage: 'spells.slots.level9 missing fields',
            bail: true
          },
          isObject: {
            errorMessage: 'spells.slots.level9 must be an object',
            bail: true
          }
        },
        'spells.slots.level1.total': {
          exists: {
            errorMessage: 'spells.slots.level1.total is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 13 },
            errorMessage: 'spells.slots.level1.total must be between 0 and 13',
            bail: true
          }
        },
        'spells.slots.level1.expended': {
          exists: {
            errorMessage: 'spells.slots.level1.expended is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 13 },
            errorMessage:
              'spells.slots.level1.expended must be between 0 and 13',
            bail: true
          }
        },
        'spells.slots.level2.total': {
          exists: {
            errorMessage: 'spells.slots.level2.total is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 13 },
            errorMessage: 'spells.slots.level2.total must be between 0 and 13',
            bail: true
          }
        },
        'spells.slots.level2.expended': {
          exists: {
            errorMessage: 'spells.slots.level2.expended is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 13 },
            errorMessage:
              'spells.slots.level2.expended must be between 0 and 13',
            bail: true
          }
        },
        'spells.slots.level3.total': {
          exists: {
            errorMessage: 'spells.slots.level3.total is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 13 },
            errorMessage: 'spells.slots.level3.total must be between 0 and 13',
            bail: true
          }
        },
        'spells.slots.level3.expended': {
          exists: {
            errorMessage: 'spells.slots.level3.expended is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 13 },
            errorMessage:
              'spells.slots.level3.expended must be between 0 and 13',
            bail: true
          }
        },
        'spells.slots.level4.total': {
          exists: {
            errorMessage: 'spells.slots.level4.total is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 13 },
            errorMessage: 'spells.slots.level4.total must be between 0 and 13',
            bail: true
          }
        },
        'spells.slots.level4.expended': {
          exists: {
            errorMessage: 'spells.slots.level4.expended is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 13 },
            errorMessage:
              'spells.slots.level4.expended must be between 0 and 13',
            bail: true
          }
        },
        'spells.slots.level5.total': {
          exists: {
            errorMessage: 'spells.slots.level5.total is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 9 },
            errorMessage: 'spells.slots.level5.total must be between 0 and 9',
            bail: true
          }
        },
        'spells.slots.level5.expended': {
          exists: {
            errorMessage: 'spells.slots.level5.expended is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 9 },
            errorMessage:
              'spells.slots.level5.expended must be between 0 and 9',
            bail: true
          }
        },
        'spells.slots.level6.total': {
          exists: {
            errorMessage: 'spells.slots.level6.total is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 9 },
            errorMessage: 'spells.slots.level6.total must be between 0 and 9',
            bail: true
          }
        },
        'spells.slots.level6.expended': {
          exists: {
            errorMessage: 'spells.slots.level6.expended is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 9 },
            errorMessage:
              'spells.slots.level6.expended must be between 0 and 9',
            bail: true
          }
        },
        'spells.slots.level7.total': {
          exists: {
            errorMessage: 'spells.slots.level7.total is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 9 },
            errorMessage: 'spells.slots.level7.total must be between 0 and 9',
            bail: true
          }
        },
        'spells.slots.level7.expended': {
          exists: {
            errorMessage: 'spells.slots.level7.expended is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 9 },
            errorMessage:
              'spells.slots.level7.expended must be between 0 and 9',
            bail: true
          }
        },
        'spells.slots.level8.total': {
          exists: {
            errorMessage: 'spells.slots.level8.total is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 7 },
            errorMessage: 'spells.slots.level8.total must be between 0 and 7',
            bail: true
          }
        },
        'spells.slots.level8.expended': {
          exists: {
            errorMessage: 'spells.slots.level8.expended is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 7 },
            errorMessage:
              'spells.slots.level8.expended must be between 0 and 7',
            bail: true
          }
        },
        'spells.slots.level9.total': {
          exists: {
            errorMessage: 'spells.slots.level9.total is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 7 },
            errorMessage: 'spells.slots.level9.total must be between 0 and 7',
            bail: true
          }
        },
        'spells.slots.level9.expended': {
          exists: {
            errorMessage: 'spells.slots.level9.expended is required',
            bail: true
          },
          isInt: {
            options: { min: 0, max: 7 },
            errorMessage:
              'spells.slots.level9.expended must be between 0 and 7',
            bail: true
          }
        },
        'spells.slots.level1.known': {
          exists: {
            errorMessage: 'spells.slots.level1.known is required',
            bail: true
          },
          isArray: {
            options: { min: 12, max: 12 },
            errorMessage: 'spells.slots.level1.known should be length 12',
            bail: true
          }
        },
        'spells.slots.level2.known': {
          exists: {
            errorMessage: 'spells.slots.level2.known is required',
            bail: true
          },
          isArray: {
            options: { min: 13, max: 13 },
            errorMessage: 'spells.slots.level2.known should be length 13',
            bail: true
          }
        },
        'spells.slots.level3.known': {
          exists: {
            errorMessage: 'spells.slots.level3.known is required',
            bail: true
          },
          isArray: {
            options: { min: 13, max: 13 },
            errorMessage: 'spells.slots.level3.known should be length 13',
            bail: true
          }
        },
        'spells.slots.level4.known': {
          exists: {
            errorMessage: 'spells.slots.level4.known is required',
            bail: true
          },
          isArray: {
            options: { min: 13, max: 13 },
            errorMessage: 'spells.slots.level4.known should be length 13',
            bail: true
          }
        },
        'spells.slots.level5.known': {
          exists: {
            errorMessage: 'spells.slots.level5.known is required',
            bail: true
          },
          isArray: {
            options: { min: 9, max: 9 },
            errorMessage: 'spells.slots.level5.known should be length 9',
            bail: true
          }
        },
        'spells.slots.level6.known': {
          exists: {
            errorMessage: 'sspells.slots.level6.known is required',
            bail: true
          },
          isArray: {
            options: { min: 9, max: 9 },
            errorMessage: 'sspells.slots.level6.known should be length 9',
            bail: true
          }
        },
        'spells.slots.level7.known': {
          exists: {
            errorMessage: 'spells.slots.level7.known is required',
            bail: true
          },
          isArray: {
            options: { min: 9, max: 9 },
            errorMessage: 'spells.slots.level7.known should be length 9',
            bail: true
          }
        },
        'spells.slots.level8.known': {
          exists: {
            errorMessage: 'spells.slots.level8.known is required',
            bail: true
          },
          isArray: {
            options: { min: 7, max: 7 },
            errorMessage: 'spells.slots.level8.known should be length 7',
            bail: true
          }
        },
        'spells.slots.level9.known': {
          exists: {
            errorMessage: 'spells.slots.level9.known is required',
            bail: true
          },
          isArray: {
            options: { min: 7, max: 7 },
            errorMessage: 'spells.slots.level9.known should be length 7',
            bail: true
          }
        },
        'spells.slots.*.*.*.name': {
          exists: {
            errorMessage:
              'spells.slots.[LEVEL].[KNOWN].[SPELL].name is required',
            bail: true
          },
          isString: {
            errorMessage:
              'spells.slots.[LEVEL].[KNOWN].[SPELL].name must be a string',
            bail: true
          },
          isLength: {
            options: { max: 28 },
            errorMessage:
              'spells.slots.[LEVEL].[KNOWN].[SPELL].name max length is 28 characters',
            bail: true
          }
        },
        'spells.slots.*.*.*.prepared': {
          exists: {
            errorMessage:
              'spells.slots.[LEVEL].[KNOWN].[SPELL].prepared is required',
            bail: true
          },
          isBoolean: {
            errorMessage:
              'spells.slots.[LEVEL].[KNOWN].[SPELL].prepared must be true or false'
          }
        }
      },
      ['body']
    )
  ).run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const msg: string[] = errors.array().map((er) => `${er.msg}`);
    const error: iError = {
      error: msg,
      status: 400
    };
    next(error);
  }
  next();
};

export default {
  validateCharacter,
  validateCharacterExistance
};

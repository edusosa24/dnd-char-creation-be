import mongoose from 'mongoose';
import { User } from '../../src/models/user';
import { Character } from '../../src/models/character';
import supertest from 'supertest';
import app from '../../src/server/app';
import * as sampleCharacters from '../sampleData/sampleCharacters.json';
import * as sampleUsers from '../sampleData/sampleUsers.json';

const api = supertest(app);

beforeAll(async () => {
  const user = new User({
    ...sampleUsers.users[0]
  });
  await user.save();
});

afterEach(async () => {
  await Character.deleteMany({});
});

afterAll(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe('Post characters tests', () => {
  test('Character gets created correctly', async () => {
    const user = await User.findOne({});
    const response = await api
      .post(`/api/characters/user/${user!.id}`)
      .send(sampleCharacters.correct);

    expect(response.statusCode).toBe(201);
    expect(response.body.general.name).toStrictEqual(
      sampleCharacters.correct.general.name
    );
  });
  test('Character is not created because is missing fields', async () => {
    const user = await User.findOne({});
    const response = await api
      .post(`/api/characters/user/${user!.id}`)
      .send(sampleCharacters.missingFields);

    expect(response.statusCode).toBe(400);
    expect(response.body.error.length).toBe(183);
    expect(response.body.error).toContain('general.level is required');
    expect(response.body.error).toContain(
      'abilityScore.savingThrows.constitution.proficiency is required'
    );
  });

  test('Character is not created because user does not exists', async () => {
    const mockId = new mongoose.Types.ObjectId();
    const response = await api
      .post(`/api/characters/user/${mockId}`)
      .send(sampleCharacters.correct);

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toStrictEqual(['user not found']);
  });
  test('Character is created but gets sanitized fields', async () => {
    const user = await User.findOne({});
    const response = await api
      .post(`/api/characters/user/${user!.id}`)
      .send(sampleCharacters.sanitize);

    expect(response.statusCode).toBe(201);
    expect(response.body.general.name).toStrictEqual('TEST');
    expect(response.body.equipmentAndMoney.equipment).toStrictEqual('({})');
    expect(response.body.combat.attacksAndSpellcasting.extra).toStrictEqual('');
  });
});

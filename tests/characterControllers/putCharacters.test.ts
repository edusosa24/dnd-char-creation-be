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
  const character = new Character({
    ...sampleCharacters.correct,
    user: user._id
  });
  await character.save();
  user.characters.push(character._id);
  await user.save();
});

afterAll(async () => {
  await Character.deleteMany({});
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe('Put characters tests', () => {
  test('Updates character correctly', async () => {
    const user = await User.findOne({});
    const character = await Character.findOne({});
    const response = await api
      .put(`/api/characters/user/${user!._id}/character/${character!._id}`)
      .send({
        ...sampleCharacters.updated
      });

    expect(response.statusCode).toBe(200);
    expect(character!.general!.name).toStrictEqual('TE.ST');
    expect(character!.general!.class).toStrictEqual('WARRIOR');
    expect(character!.general!.level).toBe(10);
    expect(response.body.general.name).toStrictEqual('Test Update');
    expect(response.body.general.class).toStrictEqual('Mage');
    expect(response.body.general.level).toBe(12);
  });
  test("Can't update character because it doesn't exists", async () => {
    const user = await User.findOne({});
    const mockId = new mongoose.Types.ObjectId();
    const response = await api
      .put(`/api/characters/user/${user!._id}/character/${mockId}`)
      .send({
        ...sampleCharacters.updated
      });

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toContain('character not found');
  });
});

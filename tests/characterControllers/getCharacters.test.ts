require('dotenv').config();
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

describe('Get characters tests', () => {
  test('Retrieves character correctly', async () => {
    const character = await Character.findOne({});
    const response = await api.get(`/api/characters/${character!._id}`).send();

    expect(response.statusCode).toBe(200);
    expect(response.body.general.name).toStrictEqual(
      sampleCharacters.correct.general.name
    );
  });
  test("Can't retrieve character because it doesn't exists", async () => {
    const mockId = new mongoose.Types.ObjectId();
    const response = await api.get(`/api/characters/${mockId}`).send();

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toContain('character not found');
  });
  test('Retrieves character from user', async () => {
    const user = await User.findOne({});
    const response = await api.get(`/api/characters/user/${user!._id}`).send();

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].general.name).toStrictEqual('TE.ST');
  });
  test('Retrieves all characters', async () => {
    const response = await api.get(`/api/characters`).send({
      username: process.env.ADMIN_USER,
      password: process.env.ADMIN_PASSWORD
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].general.name).toStrictEqual('TE.ST');
  });
});

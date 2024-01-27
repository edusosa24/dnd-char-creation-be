import mongoose from 'mongoose';
import { User } from '../../src/models/user';
import { Character } from '../../src/models/character';
import supertest from 'supertest';
import app from '../../src/server/app';
import * as sampleCharacters from '../sampleData/sampleCharacters.json';
import * as sampleUsers from '../sampleData/sampleUsers.json';

const api = supertest(app);

beforeEach(async () => {
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

afterEach(async () => {
  await Character.deleteMany({});
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Delete character tests', () => {
  test('Character gets deleted correctly', async () => {
    const user = await User.findOne({});
    const character = await Character.findOne({});
    const response = await api.delete(
      `/api/characters/user/${user!._id}/character/${character!._id}`
    );
    expect(response.statusCode).toBe(204);
  }),
    test('Character gets deleted after deleting user', async () => {
      const user = await User.findOne({});
      const response = await api.delete(`/api/users/${user!._id}`);
      const character = await Character.findOne({});
      expect(response.statusCode).toBe(204);
      expect(character).toBeNull();
    });
  test('Character is not found', async () => {
    const user = await User.findOne({});
    const mockId = new mongoose.Types.ObjectId();
    const response = await api.delete(
      `/api/characters/user/${user!._id}/character/${mockId}`
    );
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toStrictEqual(['character not found']);
  });
});

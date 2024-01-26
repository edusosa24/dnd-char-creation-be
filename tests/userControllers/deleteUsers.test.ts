import mongoose from 'mongoose';
import { User } from '../../src/models/user';
import supertest from 'supertest';
import app from '../../src/server/app';
import * as samples from './sampleUsers.json';

const api = supertest(app);

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Delete users tests', () => {
  test('User gets deleted correctly', async () => {
    const testUser = new User({
      ...samples.users[0]
    });
    await testUser.save();
    const response = await api.delete(`/api/users/${testUser._id}`);
    expect(response.statusCode).toBe(204);
  }),
    test('User is not found', async () => {
      const testUser = new User({
        ...samples.users[0]
      });
      const response = await api.delete(`/api/users/${testUser._id}`);
      expect(response.statusCode).toBe(404);
      expect(response.body.error).toStrictEqual(['user not found']);
    });
});

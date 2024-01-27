import mongoose from 'mongoose';
import { User } from '../../src/models/user';
import supertest from 'supertest';
import app from '../../src/server/app';
import * as samples from '../sampleData/sampleUsers.json';

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Post users tests', () => {
  test('User gets created correctly', async () => {
    const response = await api.post('/api/users').send(samples.users[0]);

    expect(response.statusCode).toBe(201);
    expect(response.body.username).toBe(samples.users[0].username);
  });
  test('Username is already on db', async () => {
    const testUser = new User({
      ...samples.users[0]
    });
    await testUser.save();

    const response = await api.post('/api/users').send(samples.users[0]);
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toStrictEqual(['username already exists']);
  });
  test('Missing username/password on body', async () => {
    const response = await api.post('/api/users').send(samples.emptyUser);
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toContain(
      'password should be between 8 and 20 characters long'
    );
    expect(response.body.error).toContain(
      'username should be between 6 and 12 characters long'
    );
  });
  test('Username/password fail validation', async () => {
    const response = await api.post('/api/users').send(samples.badUser);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toContain('username must be a string');
    expect(response.body.error).toContain('password is required');
  });
});

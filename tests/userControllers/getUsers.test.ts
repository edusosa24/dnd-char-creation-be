require('dotenv').config();
import mongoose from 'mongoose';
import { User } from '../../src/models/user';
import supertest from 'supertest';
import app from '../../src/server/app';
import * as samples from './sampleUsers.json';

const api = supertest(app);

beforeAll(async () => {
  const testUser1 = new User({
    ...samples.users[0]
  });
  await testUser1.save();
});

afterAll(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe('Get users tests', () => {
  test('Retrieve user correctly', async () => {
    const user = await User.findOne({});
    const response = await api.get(`/api/users/${user!._id}`).send();

    expect(response.statusCode).toBe(200);
    expect(response.body.username).toEqual(user!.username);
    expect(response.body.id).toEqual(user!.id);
  });

  test('User does not exist', async () => {
    const testUser = new User({
      ...samples.users[1]
    });
    const response = await api.get(`/api/users/${testUser._id}`).send();

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toStrictEqual(['user not found']);
  });

  test('Retrieve all users [2]', async () => {
    const testUser = new User({
      ...samples.users[1]
    });
    await testUser.save();
    const response = await api.get('/api/users').send({
      username: process.env.ADMIN_USER,
      password: process.env.ADMIN_PASSWORD
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[1]).toHaveProperty('username');
    expect(response.body[1]).toHaveProperty('characters');
    expect(response.body[1]).toHaveProperty('campaigns');
  });
});

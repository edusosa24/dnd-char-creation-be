require('dotenv').config();
import mongoose from 'mongoose';
import { User } from '../../src/models/user';
import supertest from 'supertest';
import app from '../../src/server/app';
import * as sampleUsers from '../sampleData/sampleUsers.json';

const api = supertest(app);

beforeAll(async () => {
  const user = new User({
    ...sampleUsers.users[0]
  });
  await user.save();
});

afterAll(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe('Login tests', () => {
  test('Login is successfull and returns a token', async () => {
    const response = await api
      .post('/api/login')
      .set({
        username: sampleUsers.users[0].username,
        password: sampleUsers.users[0].password
      })
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body.token).not.toBeNull();
  }); /*,
    test('Login fails because user is invalid', async () => {});*/
});

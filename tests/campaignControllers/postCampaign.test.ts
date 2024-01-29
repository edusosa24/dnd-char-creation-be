import mongoose from 'mongoose';
import { User } from '../../src/models/user';
import { Campaign } from '../../src/models/campaign';
import supertest from 'supertest';
import app from '../../src/server/app';
import * as sampleCampaigns from '../sampleData/sampleCampaigns.json';
import * as sampleUsers from '../sampleData/sampleUsers.json';

const api = supertest(app);

beforeAll(async () => {
  const user = new User({
    ...sampleUsers.users[0]
  });
  await user.save();
});

afterEach(async () => {
  await Campaign.deleteMany({});
});

afterAll(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe('Post campaigns tests', () => {
  test('Campaign gets created correctly', async () => {
    const user = await User.findOne({});
    const response = await api
      .post(`/api/campaigns/user/${user!.id}`)
      .send(sampleCampaigns.correct);

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toStrictEqual(sampleCampaigns.correct.name);
  });
  test('Campaign is not created because is missing fields', async () => {
    const user = await User.findOne({});
    const response = await api
      .post(`/api/campaigns/user/${user!.id}`)
      .send(sampleCampaigns.missingFields);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toContain('name is required');
  });

  test('Campaign is not created because user does not exists', async () => {
    const mockId = new mongoose.Types.ObjectId();
    const response = await api
      .post(`/api/campaigns/user/${mockId}`)
      .send(sampleCampaigns.correct);

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toStrictEqual(['user not found']);
  });
  test('Campaign is created but gets sanitized fields', async () => {
    const user = await User.findOne({});
    const response = await api
      .post(`/api/campaigns/user/${user!.id}`)
      .send(sampleCampaigns.sanitize);

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toStrictEqual('');
  });
});

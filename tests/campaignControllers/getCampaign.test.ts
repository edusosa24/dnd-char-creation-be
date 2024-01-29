require('dotenv').config();
import mongoose from 'mongoose';
import { User } from '../../src/models/user';
import { Character } from '../../src/models/character';
import { Campaign } from '../../src/models/campaign';
import supertest from 'supertest';
import app from '../../src/server/app';
import * as sampleCampaigns from '../sampleData/sampleCampaigns.json';
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
  const campaign = new Campaign({
    ...sampleCampaigns.correct,
    characters: [],
    master: user._id
  });
  await character.save();
  campaign.characters.push(character._id);
  await campaign.save();
  user.characters.push(character._id);
  user.campaigns.push(campaign._id);
  await user.save();
});

afterAll(async () => {
  await Campaign.deleteMany({});
  await Character.deleteMany({});
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe('Get campaigns tests', () => {
  test('Retrieves campaign correctly', async () => {
    const campaign = await Campaign.findOne({});
    const response = await api.get(`/api/campaigns/${campaign!._id}`).send();

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toStrictEqual(sampleCampaigns.correct.name);
    expect(
      campaign!.characters[0]._id.equals(response.body.characters[0])
    ).toBeTruthy();
  });
  test("Can't retrieve campaign because it doesn't exists", async () => {
    const mockId = new mongoose.Types.ObjectId();
    const response = await api.get(`/api/campaigns/${mockId}`).send();

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toContain('campaign not found');
  });
  test('Retrieves campaign from user', async () => {
    const user = await User.findOne({});
    const campaign = await Campaign.findOne({});
    const response = await api.get(`/api/campaigns/user/${user!._id}`).send();

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toStrictEqual(sampleCampaigns.correct.name);
    expect(
      campaign!.characters[0]._id.equals(response.body[0].characters[0])
    ).toBeTruthy();
  });
  test('Retrieves all campaigns', async () => {
    const campaign = await Campaign.findOne({});
    const response = await api.get(`/api/campaigns`).send({
      username: process.env.ADMIN_USER,
      password: process.env.ADMIN_PASSWORD
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toStrictEqual(sampleCampaigns.correct.name);
    expect(
      campaign!.characters[0]._id.equals(response.body[0].characters[0])
    ).toBeTruthy();
  });
});

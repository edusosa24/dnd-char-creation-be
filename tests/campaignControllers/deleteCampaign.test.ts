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

beforeEach(async () => {
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

afterEach(async () => {
  await Campaign.deleteMany({});
  await Character.deleteMany({});
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Delete campaign tests', () => {
  test('Campaign gets deleted correctly', async () => {
    const user = await User.findOne({});
    const campaign = await Campaign.findOne({});
    const response = await api.delete(
      `/api/campaigns/user/${user!._id}/campaign/${campaign!._id}`
    );
    expect(response.statusCode).toBe(204);
  }),
    test('Campaign gets deleted after deleting user', async () => {
      const user = await User.findOne({});
      const response = await api.delete(`/api/users/${user!._id}`);
      const campaign = await Campaign.findOne({});
      expect(response.statusCode).toBe(204);
      expect(campaign).toBeNull();
    });
  test('Campaign is not found', async () => {
    const user = await User.findOne({});
    const mockId = new mongoose.Types.ObjectId();
    const response = await api.delete(
      `/api/campaigns/user/${user!._id}/campaign/${mockId}`
    );
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toStrictEqual(['campaign not found']);
  });
});

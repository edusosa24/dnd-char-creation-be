import mongoose from 'mongoose';
import { Campaign } from '../../src/models/campaign';
import { User } from '../../src/models/user';
import { Character } from '../../src/models/character';
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
  await character.save();
  user.characters.push(character._id);
  await user.save();
});

beforeEach(async () => {
  const user = await User.findOne({});
  const campaign = new Campaign({
    ...sampleCampaigns.correct,
    master: user!._id
  });
  await campaign.save();
  user?.campaigns.push(campaign._id);
  await user?.save();
});

afterEach(async () => {
  const user = await User.findOne({});
  const campaign = await Campaign.findOneAndDelete({});
  user!.campaigns = [];
  await user!.save();
});

afterAll(async () => {
  await Character.deleteMany({});
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe('Put Campaign tests', () => {
  test('Updates Campaign correctly', async () => {
    const user = await User.findOne({});
    const character = await Character.findOne({});
    const campaign = await Campaign.findOne({});

    const response = await api
      .put(`/api/campaigns/user/${user!._id}/campaign/${campaign!._id}`)
      .send({
        name: 'Test Update',
        characters: [character!._id]
      });

    expect(response.statusCode).toBe(200);
    expect(campaign!.name).toStrictEqual('testCampaign');
    expect(campaign!.characters).toHaveLength(0);
    expect(response.body.name).toStrictEqual('Test Update');
    expect(response.body.characters).toHaveLength(1);
    expect(character!._id.equals(response.body.characters[0])).toBeTruthy();
  });
  test("Can't update campaign because it doesn't exists", async () => {
    const user = await User.findOne({});
    const character = await Character.findOne({});
    const mockId = new mongoose.Types.ObjectId();
    const response = await api
      .put(`/api/campaigns/user/${user!._id}/campaign/${mockId}`)
      .send({
        name: 'Test Update',
        characters: [character!._id]
      });

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toContain('campaign not found');
  });
  test("Can't update campaign because character doesn't exists", async () => {
    const user = await User.findOne({});
    const campaign = await Campaign.findOne({});
    const mockId = new mongoose.Types.ObjectId();
    const response = await api
      .put(`/api/campaigns/user/${user!._id}/campaign/${campaign!._id}`)
      .send({
        name: 'Test Update',
        characters: [mockId]
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toContain(
      `character id: ${mockId} does not exists`
    );
  });
  test('Campaign is updated but sanitized', async () => {
    const user = await User.findOne({});
    const character = await Character.findOne({});
    const campaign = await Campaign.findOne({});

    const response = await api
      .put(`/api/campaigns/user/${user!._id}/campaign/${campaign!._id}`)
      .send({
        name: sampleCampaigns.sanitize.name,
        characters: [character!._id]
      });

    expect(response.statusCode).toBe(200);
    expect(campaign!.name).toStrictEqual('testCampaign');
    expect(campaign!.characters).toHaveLength(0);
    expect(response.body.name).toStrictEqual('');
    expect(response.body.characters).toHaveLength(1);
    expect(character!._id.equals(response.body.characters[0])).toBeTruthy();
  });
});

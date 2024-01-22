import mongoose from 'mongoose';
const { Schema } = mongoose;

const campaignSchema = new Schema({
  name: {
    type: String
  },
  characters: {
    type: [Schema.Types.ObjectId],
    ref: 'Character'
  },
  master: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

campaignSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

export const Campaign = mongoose.model('Campaign', campaignSchema);

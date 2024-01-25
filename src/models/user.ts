import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    require: [true, 'Username is required']
  },
  password: {
    type: String,
    require: [true, 'Password is required']
  },
  campaigns: {
    type: [Schema.Types.ObjectId],
    ref: 'Campaign'
  },
  characters: {
    type: [Schema.Types.ObjectId],
    ref: 'Character'
  }
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.password;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

export const User = mongoose.model('User', userSchema);

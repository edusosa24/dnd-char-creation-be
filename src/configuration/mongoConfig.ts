import mongoose from 'mongoose';
import loggers from '../utils/loggers';

export const dbConnect = async () => {
  try {
    const mongoURL: string =
      process.env.NODE_ENV !== 'test'
        ? process.env.MONGO_URI!
        : process.env.MONGO_TEST!;

    mongoose.set('strictQuery', false);
    loggers.infoLog('Connecting to', mongoURL);
    await mongoose.connect(mongoURL);
    loggers.infoLog('Connected to DB');
  } catch (error: any) {
    loggers.errorLog('Error connecting to DB.', error.message());
  }
};

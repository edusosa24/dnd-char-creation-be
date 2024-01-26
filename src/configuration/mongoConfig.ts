require('dotenv').config();
import mongoose from 'mongoose';
import loggers from '../utils/loggers';

const mongoURL: string =
  process.env.NODE_ENV !== 'test'
    ? process.env.MONGO_URI!
    : process.env.MONGO_TEST!;

export const dbConnect = async () => {
  mongoose.set('strictQuery', false);
  mongoose.connect(mongoURL);
  const db = mongoose.connection;
  db.on('connecting', () => {
    loggers.infoLog('connecting to ', mongoURL);
  });
  db.on('connected', () => {
    loggers.infoLog('connected to DB');
  });
  db.on('reconnecting', () => {
    loggers.infoLog('attempting reconnect');
  });
  db.on('reconnected', () => {
    loggers.infoLog('connected to DB');
  });
  db.on('error', (err) => {
    loggers.errorLog('Could not connect to  DB. ', err.msg);
  });
};

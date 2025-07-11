import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from './config/env.js';

if(!DB_URI) {
  throw new Error('MONGODB_URI environment variable is not defined inside .env.development/production.local');
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);

    console.log(`Connected to mongodb database in ${NODE_ENV} mode`);
  } catch (error) {
    console.error('Error connecting to database: ', error);

    process.exit(1);
  }
}

export default connectToDatabase;
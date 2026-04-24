import app from '../app.js';
import connectDB from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

// Ensure DB is connected for every request in serverless
const handler = async (req, res) => {
  await connectDB();
  return app(req, res);
};

export default handler;

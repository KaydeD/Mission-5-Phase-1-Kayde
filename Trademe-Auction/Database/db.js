import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/TrademeAuction');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Connection failed:', error);
    process.exit(1);
  }
};

export default connectDB;
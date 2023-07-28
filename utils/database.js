import mongoose from "mongoose";
const { MONGODB_URI } = process.env;

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true)
  if (isConnected) {
    console.log('MongoDB has already connected');
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: 'share_prompt',
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
  }
}
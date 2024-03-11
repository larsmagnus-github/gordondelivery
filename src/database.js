import mongoose from 'mongoose';

/**
 * Connect to MongoDB with Mongoose
 * 
 * @returns {Promise<mongoose.Connection>}
 */
export const connectDb = async () => {
  try {
    const dbConnection = await mongoose.connect(process.env.MONGO_DB);
    console.log("Connected to MongoDB with Mongoose");
    return dbConnection;
  } catch (e) {
    console.error("Failed to connect to MongoDB", e);
    process.exit(1);
  }
};

/**
 * Disconnect from MongoDB
 * 
 * @returns {Promise<void>}
 */
export const disconnectDb = async () => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (e) {
    console.error("Failed to disconnect from MongoDB", e);
    process.exit(1);
  }
}

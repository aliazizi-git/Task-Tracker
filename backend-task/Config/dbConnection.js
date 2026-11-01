import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.BASE_DB_URL, {
      dbName: process.env.BASE_DB_NAME,
    });
    console.log("database connected successfully!");
  } catch (error) {
    console.log("connection failed", error.message);
  }
};
export default dbConnection;

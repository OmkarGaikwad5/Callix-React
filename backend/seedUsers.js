import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../backend/src/models/user_model.js"; // ✅ Fixed import path
dotenv.config();

const mongoURL = process.env.MONGO_URL;

const insertDummyUsers = async () => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "Callix",
    });
    console.log("✅ Connected to MongoDB Atlas");

    await User.deleteMany({}); // clean collection
    console.log("🧹 Existing users cleared");

    const dummyUsers = [
      { name: "Omkar Gaikwad", username: "omkargaikwad", password: "password123", token: "token123" },
      { name: "John Doe", username: "johndoe", password: "password456", token: "token456" },
      { name: "Jane Smith", username: "janesmith", password: "password789", token: "token789" },
    ];

    const result = await User.insertMany(dummyUsers);
    console.log("✅ Dummy users inserted:", result);

    await mongoose.disconnect();
    console.log("✅ Connection closed");
  } catch (err) {
    console.error("❌ Error inserting users:", err.message);
  }
};

insertDummyUsers();

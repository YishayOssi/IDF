import mongoose from "mongoose"
import { initDB } from "./initDB.js"

try {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log("Connected to MongoDB successfully")
  await initDB()
} catch (error) {
  console.log("Failed to connect to MongoDB", error)
}

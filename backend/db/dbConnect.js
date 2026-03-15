import { MongoClient } from "mongodb";
import { atBashPassword } from "../utils/atBash.js";
import bcrypt from "bcrypt"

const client = new MongoClient(process.env.MONGODB_URI);
let db;

export async function dbConnect() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    
    db = client.db("IDF");
    const agentsTable = db.collection("agents");
    const admin = await agentsTable.findOne({ role: "admin" });
    
    // אם אדמין לא קיים > ניצור אותו כאן
    if (!admin) {
       agentsTable.insertOne({
        agentCode: "a1b2c3",
        fullName: "yishay",
        passwordHash: await bcrypt.hash(atBashPassword("yishay"),10),
        role: "admin",
        createdAt: new Date()
      });
      console.log("Initial Admin created");
    }
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
}

export const myDB = client.db("IDF");



import Agent from "../model/agent.model.js"
import { atBash } from "../utils/atBash.js"

export async function initDB() {
  try {
    const admin = await Agent.findOne({ role: "admin" })
    if (!admin) {
      await Agent.create({
        agentCode: "a1b2c3",
        fullName: "yishay",
        passwordHash: atBash("yishay"),
        role: "admin",
      })
    }
    console.log("Admin created successfully")
  } catch (error) {
    console.log("Failed to create admin", error)
  }
}

import mongoose from "mongoose"

const agentSchema = new mongoose.Schema({
  agentCode: String,
  fullName: String,
  passwordHash: String,
  role: String,
  createdAt: { type: Date, default: Date.now },
})

const Agent = mongoose.model("Agent", agentSchema)
export default Agent

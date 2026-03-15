import {myDB} from "../db/dbConnect.js";
import { atBashPassword} from "../utils/atBash.js";
import bcrypt from "bcrypt"
const agentsTable = myDB.collection("agents")

export async function createAgent(req, res) {
  try {
    const {agentCode, fullName, role, password} = req.body
    let passwordHash
    if(!agentCode || !fullName || role !== "admin" &&  role !== "agent"){
      return res.status(400).json({message: "Missing data to create an agent!"})
    }
    const checkAgent = myDB.collection("agents").findOne({agentCode})
    if(checkAgent) return res.status(409).json({message: "AgentCode already exists!"})
    if(!password){  
    const atBash = atBashPassword(fullName)
    console.log(atBash);
    
    passwordHash = await  bcrypt.hash(atBash, 10) 
    
  } else{
    passwordHash = await bcrypt.hash(password, 10) 
  }

    const createdAt = new Date()
    await agentsTable.insertOne({agentCode, fullName, passwordHash, role, createdAt})
    return res.status(201).json({message: `The ${role} was created successfully...`})

  } catch (error) {
    return res.status(400).json({message: `${role} not created!`})
  }
}




export async function getAllAgents(req, res) {
  try {
    const agents = await agentsTable.find().toArray()
    console.log(agents);
    res.status(200).json({users: agents})
  } catch (error) {
    res.json({message: "Error importing agent list!"})
  }
}

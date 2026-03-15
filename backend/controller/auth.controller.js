import jwt from "jsonwebtoken"
import {myDB} from "../db/dbConnect.js"
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt"

export async function login(req, res) {
  try {
    const loggedAgent = req.body
    const agent = await myDB.collection("agents").findOne({ agentCode: loggedAgent.agentCode })
    if (!agent) return res.status(400).json({message: "AgentCode not found!"})
      const checkPassword = await bcrypt.compare(loggedAgent.password, agent.passwordHash)
    if (!checkPassword) return res.status(401).json({message: "The password is incorrect!"})
    // הנפקת טוקן במקרה של התאמה
    const token = jwt.sign(
      { id: agent._id, role: agent.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )
    return res.status(200).json({
      token,
      user: {
        id: agent._id,
        agentCode: agent.agentCode,
        fullName: agent.fullName,
        role: agent.role
      },
    })
  } catch (error) {
    return res.status(500).json({message: "Internal server error"})
  }
}


export async function me(req, res) {
  try {
    const agent = await myDB.collection("agents").findOne(
      { _id: new ObjectId(req.agent.id) },
      // השורה הזאת מוודא שהסיסמא לא תישלח גם!
      { projection: { passwordHash: 0, createdAt: 0 } } 
    );

    if (!agent) {
      return res.status(404).json({message: "Agent not found"});
    }
    const agentRes = agent
    agentRes.id = agentRes._id 
    delete agentRes._id
    return res.json({"user": agentRes});
  } catch (error) {
    return res.status(500).json({message: "Internal server error"});
  }
}

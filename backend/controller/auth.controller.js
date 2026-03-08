import Agent from "../model/agent.model.js"
import jwt from "jsonwebtoken"

export async function login(req, res) {
  try {
    const loggedAgent = req.body
    const agent = await Agent.findOne({ agentCode: loggedAgent.agentCode })
    if (!agent) return res.status(400)
    if (agent.passwordHash != loggedAgent.passwordHash) return res.status(401)
    const token = jwt.sign(
      { _id: agent._id, role: agent.role },
      process.env.JWT_SECRET,
      { expiresIn: "1week" },
    )
    return res.status(200).json({
      token,
      user: {
        _id: agent._id,
        role: agent.role,
        agentCode: agent.agentCode,
        fullName: agent.fullName,
      },
    })
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" })
  }
}

export async function me(req, res) {
  try {
    const agent = await Agent.findOne({ _id: req.agent._id })
    if (!agent) return res.status(404)
    return res.status(200).json({
      _id: agent._id,
      role: agent.role,
      fullName: agent.fullName,
      agentCode: agent.agentCode,
    })
  } catch (error) {
    return res.status(500).send("internal server error")
  }
}

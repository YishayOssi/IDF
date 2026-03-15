import express from "express"
import { auth, adminAuth } from "../middlewares/auth.js"
import { createAgent, getAllAgents } from "../controller/admin.controller.js"
const router = express.Router()


router.post("/users", auth, adminAuth, createAgent)


router.get("/users", auth, adminAuth, getAllAgents)

export default router

import express from "express"
import { auth, adminAuth } from "../middlewares/auth.js"
import { createAgent, getAllAgents } from "../controller/admin.controller.js"
const router = express.Router()

// מטרה: יצירת משתמש חדש
// הרשאה: token Bearer של Admin בלבד
// מה מקבל
// :Body JSON •
// } 'agentCode: string, fullName: string, role: 'admin' | 'agent { •
// • השרת מייצר password ראשוני לפי fullName באתב"ש או מקבל password מפורש אם רוצים
// מה מחזיר
// Created 201 •
// } } user: { id, agentCode, fullName, role, initialPasswordHint { •
// שגיאות עיקריות
// • 400 אם חסר שדה חובה
// • 409 אם agentCode כבר קיים
// • 403 אם המשתמש אינו admin
router.post("/users", auth, adminAuth, createAgent)

// מטרה: רשימת משתמשים
// הרשאה: token Bearer של Admin בלבד
// מה מקבל
// • ללא body
// מה מחזיר
// OK 200 •
// } ][users: User { •
// שגיאות עיקריות
// • 403 אם המשתמש אינו admin
router.get("/users", auth, adminAuth, getAllAgents)

export default router

import express from "express"
import { auth } from "../middlewares/auth.js"
import {
  createCsvReport,
  createReport,
  getReportById,
  getReportsAndFilter,
} from "../controller/reports.controller.js"
const router = express.Router()

// יצירת ריפורט
// Admin או Agent של Bearer token :הרשאה
// מה מקבל
// Content-Type: multipart/form-data •
// Fields: category, urgency, message •
// File optional: image •
// מה מחזיר
// Created 201 •
// } } report: { id, userId, category, urgency, message, imagePath, sourceType, createdAt { •
// שגיאות עיקריות
// • 400 אם חסר urgency ,category או message
// • 401 אם אין טוקן
// • 413 אם קובץ גדול מדי
router.post("/reports", auth, createReport)
// מטרה: קליטת קובץ CSV והמרתו לדיווחים
// Admin או Agent של Bearer token :הרשאה
// מה מקבל
// Content-Type: multipart/form-data •
// File required: csvFile •
// • פורמט מומלץ לעמודות: message ,urgency ,category
// מה מחזיר
// Created 201 •
// } ][importedCount: number, reports: Report { •
// שגיאות עיקריות
// • 400 אם לא נשלח קובץ
// • 400 אם מבנה ה-CSV שגוי
// • 401 אם אין טוקן
router.post("/reports/csv", auth, createCsvReport)
// מטרה: שליפת דיווחים עם סינון
// Bearer token :הרשאה
// מה מקבל
// agentCode, category, urgency :אופציונליים Query params •
// • Admin מקבל את כל הדיווחים לפי הסינון
// • Agent מקבל רק את הדיווחים שלו גם אם נשלחו params query אחרים
// מה מחזיר
// OK 200 •
// } ][reports: Report { •
// שגיאות עיקריות
// • 401 אם אין טוקן
router.get("/reports", auth, getReportsAndFilter)
// מטרה: שליפת דיווח בודד
// Bearer token :הרשאה
// מה מקבל
// Path param: id •
// מה מחזיר
// OK 200 •
// } report: Report { •
// שגיאות עיקריות
// • 401 אם אין טוקן
// • 403 אם Agent מנסה לגשת לדיווח שלא שייך לו
// • 404 אם הדיווח לא קיים
router.get("/reports:id", auth, getReportById)

export default router

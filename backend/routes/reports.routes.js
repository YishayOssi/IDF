import express from "express"
import { auth } from "../middlewares/auth.js"
import {createCsvReport,createReport,getReportById,getReportsAndFilter} from "../controller/reports.controller.js"
const router = express.Router()


router.post("/", auth, createReport)

router.post("/csv", auth, createCsvReport)

router.get("/", auth, getReportsAndFilter)

router.get("/:id", auth, getReportById)

export default router

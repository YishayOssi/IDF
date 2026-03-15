import express from "express"
import "dotenv/config"
import cors from "cors"
import authRouter from "./routes/auth.routes.js"
import adminRouter from "./routes/admin.routes.js"
import reportsRouter from "./routes/reports.routes.js"
import {dbConnect} from "./db/dbConnect.js"

dbConnect()
const app = express()
app.use(cors())
app.use(express.json())

// middleware
app.use("/", (req, res, next) => {
  console.log(req.method, req.url)
  next()
})

app.use("/", authRouter)
app.use("/admin", adminRouter)
app.use("/reports", reportsRouter)

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`)
})

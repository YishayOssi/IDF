import "dotenv/config"
import express from "express"
import cors from "cors"
import authRouter from "./routes/auth.routes.js"
import adminRouter from "./routes/admin.routes.js"
import reportsRouter from "./routes/reports.routes.js"
import "./db/dcConnect.js"

const app = express()
const port = process.env.PORT
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

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

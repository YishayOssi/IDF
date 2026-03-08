import express from "express";
import cors from 'cors';
import {config} from "dotenv"
import adminRouter from "./routes/admin.routes.js";

config()
const app = express()
const port = process.env.PORT
app.use(cors());
app.use(express.json());

// middleware
app.use("/", (req, res, next) => {
  console.log(req.method, req.url);
  next();
});


app.use("/admin", adminRouter)
// app.use("/reports", )
// app.use("/auth", )



app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

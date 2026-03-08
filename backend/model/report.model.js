import mongoose from "mongoose"

const reportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Agent" },
  category: String,
  urgency: String,
  message: String,
  imagePath: String,
  sourceType: String,
  createdAt: { type: Date, default: Date.now },
})

const Report = mongoose.model("Report", reportSchema)
export default Report

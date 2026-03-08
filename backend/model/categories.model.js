const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
  title: String,
  createdAt: { type: Date, default: Date.now },
})

const Catgory = mongoose.model("Category", categorySchema)
export default Catgory

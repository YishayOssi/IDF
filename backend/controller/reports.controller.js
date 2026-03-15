import {myDB}  from "../db/dbConnect.js";

const reportsTable = myDB.collection("reports")

export async function createReport(req, res) {
  const reportsTable = myDB.collection("reports")
  try {
      const {category, urgency, message, imagePath} = req.body
      if(!category || !urgency || !message) return res.status(400).json({message: "Required fields are missing!"})
        await reportsTable.insertOne({userId:req.agent.id, category, urgency, message, imagePath,  sourceType: "form", createdAt: new Date()})
        return res.status(200).json({message: "The report was sent successfully..."})

  } catch (error) {
    return res.status(500).json({message: "internal server error!"})
  }
}


export async function createCsvReport(req, res) {
  try {
  } catch (error) {}
}


export async function getReportsAndFilter(req, res) {
  
  try {
    const userId = req.agent.id;
    const reports = await reportsTable.find({ userId: userId }).toArray();
    
    if(!reports){
      return res.status(400).json({message: "bad!!!"})
    }
    return res.status(201).json(reports)
  } catch (error) {
    return res.status(500).json({message: "bad!!!"})
  }
}



export async function getReportById(req, res) {
  try {
  } catch (error) {}
}

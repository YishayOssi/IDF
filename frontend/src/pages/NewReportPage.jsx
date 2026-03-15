import React, { useState } from 'react'
import { sendReport } from '../api/api.js'
import { Link } from 'react-router'

export default function NewReportPage() {
  const [category, setCategory] = useState("intelligence")
  const [urgency ,setUrgency] = useState("low")
  const [message ,setMessage] = useState("")
  const [result, setResult] = useState("")

  async function handleSendReport(){
    const newReport = {category, urgency, message}
    const res = await sendReport(newReport)
    setResult(res.message)
    setTimeout(()=>{
      setResult("")
    }, 4000)
  }

  return (
    <div className='new-report-page'>
      <h2>Report</h2>
      <h3>{result}</h3>
      <label htmlFor="category-select">Category:</label>
      <select id="category-select" onChange={(e)=>setCategory(e.target.value)} value={category}>
        <option value="intelligence">intelligence</option>
        <option value="logistics">logistics</option>
        <option value="alert">alert</option>
      </select>

      <label htmlFor="urgency-select">Urgency:</label>
      <select id="urgency-select" onChange={(e)=>setUrgency(e.target.value)} value={urgency}>
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
      </select>
      <label htmlFor="textarea-message">Message:</label>
      <textarea type="text" placeholder='Message' id='textarea-message' onChange={(e)=>setMessage(e.target.value)} value={message}/>
      <input type="file" />
      <button onClick={handleSendReport}>Send</button> 
      <Link to={"/new/report/csv"}><button>To send a report as a csv file</button></Link>
    </div>
  )
}


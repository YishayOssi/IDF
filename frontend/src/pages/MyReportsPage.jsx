import React, { useEffect, useState } from 'react'
import ReportsTable from '../components/reportsTable'
import { getAllReports } from '../api/api';


export default function MyReportsPage() {
  const [reports, setReports] = useState([]);

  async function getData(){
    const data = await getAllReports()
    setReports(data)
  } 
  
  useEffect(()=>{
     getData()
  }, [])


  return (
    <div className='my-reports-page'>
       <ReportsTable data={reports}/>
    </div>
  )
}


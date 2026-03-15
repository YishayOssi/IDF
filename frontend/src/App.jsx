import './App.css'
import UserContext from './context/UserContext.js'
import { BrowserRouter, Route, Routes } from 'react-router'
import LoginPage from './pages/LoginPage'
import { useEffect, useState } from 'react'
import { getCurrentUser } from './api/api.js'
import AgentDashboard from './pages/AgentDashboard.jsx'
import NewReportPage from './pages/NewReportPage.jsx'
import NotAuthorized from './pages/NotAuthorized.jsx'
import MyReportsPage from './pages/MyReportsPage.jsx'
import AdminDashboardPage from './pages/AdminDashboardPage.jsx'


export default function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [isRequestDone, setIsRequestDone] = useState(false)

  async function fetchCurrentUser(){
   const res = await getCurrentUser()
   setCurrentUser(res.user)
   setIsRequestDone(true)
  }

  useEffect(()=>{
    if(localStorage.getItem("token")){
      fetchCurrentUser()
    }else{
      setIsRequestDone(true)
    }
  }, [])

  return (
    <UserContext.Provider value={{currentUser, setCurrentUser, isRequestDone}}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>}></Route>
        <Route path='/home' element={<AgentDashboard/>}></Route>
        <Route path='/my/reports' element={<MyReportsPage/>}></Route>
        <Route path='/new/report' element={<NewReportPage/>}></Route>
        <Route path='/admin/home' element={<AdminDashboardPage/>}></Route>
      </Routes>
    </BrowserRouter>
    </UserContext.Provider>
  )
}

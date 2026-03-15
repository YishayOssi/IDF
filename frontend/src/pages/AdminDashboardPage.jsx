import React, { useContext } from 'react'
import UserContext from '../context/UserContext'
import { useNavigate } from 'react-router'

export default function AdminDashboardPage() {
  const { currentUser, setCurrentUser, isRequestDone } = useContext(UserContext)
  const navigate = useNavigate()

  return (
    <>
    {currentUser.role == "admin" && <div className='admin-dashboard-page'>
      <div className='agent'>
        <h2>Agent Management</h2>
      </div>

      <div className='reports'> 
        <h2>Viewing reports</h2>
      </div>
    </div>}
    {((!currentUser && isRequestDone)|| currentUser.role != "admin") && <NotAuthorized/>}
    </>
  )
}

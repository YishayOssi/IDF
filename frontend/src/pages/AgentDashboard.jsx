import React, { useContext } from 'react'
import UserContext from '../context/UserContext.js'
import { useNavigate } from 'react-router'
import NotAuthorized from './NotAuthorized.jsx'
import LogoutButton from '../components/LogoutButton.jsx'


export default function AgentDashboard() {
    const { currentUser, setCurrentUser, isRequestDone } = useContext(UserContext)
    const navigate = useNavigate()
    return (
        <div className='agent-dashboard'>
            {currentUser &&<div className='dashboard-container'>
                <LogoutButton></LogoutButton>
                 <h1>Welcome {currentUser.fullName}</h1>
                <div className="send-report" onClick={()=>navigate("/new/report")}>
                    <h2>Sending a report</h2>
                </div>
                <div className="view-report" onClick={()=>navigate("/my/reports")}>
                    <h2>To view your reports</h2>
                </div>
            </div>}
             {(!currentUser && isRequestDone) && <NotAuthorized/>}
        </div>
    )
}

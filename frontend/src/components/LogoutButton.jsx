import React, { useContext } from 'react'
import UserContext from '../context/UserContext'
import { useNavigate } from 'react-router'

export default function LogoutButton() {
    const {setCurrentUser} = useContext(UserContext)
    const navigate = useNavigate()
    
    function handleLogout(){
        localStorage.removeItem("token")
        setCurrentUser(null)
        navigate("/")
    }

  return (
    <div className='logout-button'>
        <button onClick={handleLogout}>logout</button>
    </div>
  )
}

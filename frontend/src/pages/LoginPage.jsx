import { useState } from "react"
import { login } from "../api/api.js"
import { useContext } from "react"
import UserContext from "../context/UserContext.js"
import { useNavigate } from "react-router"

export default function LoginPage() {
  const { currentUser, setCurrentUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [agentCode, setAgentCode] = useState("")
  const [password, setPassword] = useState("")
  console.log("agentCode:" + agentCode);
  console.log("password:" + password);
  const [loginError, setLoginError] = useState("")



  async function handleLogin() {
    const res = await login(agentCode, password)
    console.log(res);
    
    if(res){
      localStorage.setItem("token", res.token)
      setCurrentUser(res.user)
      navigate("/home")
    }else{
      setLoginError("Login Error!") 
    }
  }


  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Agents entry</h1>
        <h2>{loginError}</h2>
        <input type="text" placeholder="Agent Code" onChange={function (e) {setAgentCode(e.target.value)}} />
        <input type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  )
}


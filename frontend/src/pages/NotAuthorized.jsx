import React from 'react'
import { Link } from 'react-router'

export default function NotAuthorized() {
  return (
    <div>
        <h1>NotAuthorized</h1>
        <Link to="/">Back To Login</Link>
    </div>
  )
}

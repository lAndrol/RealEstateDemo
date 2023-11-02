import React from 'react'
import { Link } from 'react-router-dom'

export default function RegisterPage() {
    const containerStyle ={display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh', 
  };
  return (
    <div style={containerStyle}>
        <div>
        <Link className="btn btn-primary mx-30" to={`/addbusiness`}>İşletme Üyeliği</Link>
        <Link className="btn btn-danger m-5" to="/adduser">Bireysel Üyelik</Link>
        </div>
    </div>
    
  )
}

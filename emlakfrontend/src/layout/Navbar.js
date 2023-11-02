import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../users/UserContex';
import { useBusiness } from '../businesses/BusinessContex';

export default function Navbar({isLoggedIn,onLogout,isBusinessLoggedIn,onBusinessLogout}) {
  
  const { userId } = useUser();
  const {businessId} = useBusiness();

  let navigate=useNavigate();
  const onExitClick = async ()=>{
    await onLogout();
    navigate("/businesslogin")
  }
  const onBusinessExitClick = async ()=>{
    await onBusinessLogout();
    navigate("/businesslogin")
  }
  function toRender(){
    let componentToRender;
    if (!isLoggedIn && !isBusinessLoggedIn) {
      componentToRender = 
        <div>
        <Link className="btn btn-outline-light m-2" to="/loginpage">Giriş yap</Link>
        <Link className="btn btn-outline-light" to="/registerpage">Üye ol</Link>
        </div>

      
    } else if (isLoggedIn && !isBusinessLoggedIn) {
      componentToRender = <div>
        <Link className='btn btn-outline-danger m-2' to={`/addestate`}>Sat/Kirala</Link>
      <Link className="btn btn-outline-light m-2" to={`/userprofile/${userId}`}>Detaylar</Link>
      <button onClick={onExitClick} className="btn btn-outline-light" to="/userlogin">Çıkış</button>
      </div>

      
    } else if (!isLoggedIn && isBusinessLoggedIn) {
      componentToRender = 
      <div>
      <Link className='btn btn-outline-danger m-2' to={`/addestate`}>Sat/Kirala</Link>
      <Link className="btn btn-outline-light m-2" to={`/businessprofile/${businessId}`}>Detaylar</Link>
      <button onClick={onBusinessExitClick} className="btn btn-outline-light" to="/businesslogin">Çıkış</button>
      </div>
      ;
    }
    return componentToRender
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <div className="container-fluid">
    <Link className="btn btn-outline"to={"/"}>Emlak Demo</Link>
      <div>
        {toRender()}
      </div> 
    </div>
  </nav>
</div>
  )
}
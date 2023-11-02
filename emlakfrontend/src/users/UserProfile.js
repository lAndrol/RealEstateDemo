import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function UserProfile() {

    const [user,setUser]=useState({
        name:"",
        lastName:"",
        homePhoneN:"",
        cellPhoneN:"",
        email:""
    })

    const{customerId}=useParams();

    useEffect(()=>{
        loadUser();
    },[])

    const loadUser=async ()=>{
        const result=await axios.get(`http://localhost:8080/customer/${customerId}`)
        setUser(result.data)
    }

  return (
    <div className='container'>
    <div className='row'>
      <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className="text-center m-4">Üye Detayları</h2>

          <div className='card'>
            <div className='card-header'>
                <ul className='list-group list-group-flush'>
                    <li className='list-group-item'>
                        <b>İsim:</b>
                        {user.name}
                    </li>
                    <li className='list-group-item'>
                        <b>Soyisim:</b>
                        {user.lastName}
                    </li>
                    <li className='list-group-item'>
                        <b>Ev Telefonu:</b>
                        {user.homePhoneN}
                    </li>
                    <li className='list-group-item'>
                        <b>Cep telefonu:</b>
                        {user.cellPhoneN}
                    </li>
                    <li className='list-group-item'>
                        <b>E-Mail:</b>
                        {user.email}
                    </li>
                </ul>
            </div>
          </div>
          <Link className ="btn btn-primary my-2" to={"/"}>Back to Home</Link>
          <Link className="btn btn--outline-primary mx-2" to={`/edituser/${user.customerId}`}>Edit</Link>
          <Link className="btn btn--outline-primary mx-2" to={`/userprofile/${user.customerId}/owned`}>Listelemeler</Link>
    </div>
    </div>
    </div>
  )
}


import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function BusinessProfile() {

    const [business,setBusiness]=useState({
        name:"",
        phoneN:"",
        fax:"",
        email:"",
        password:""
    })

    const{businessId}=useParams();

    useEffect(()=>{
        loadBusiness();
    },[])

    const loadBusiness=async ()=>{
        const result=await axios.get(`http://localhost:8080/business/${businessId}`)
        setBusiness(result.data)
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
                        {business.name}
                    </li>
                    <li className='list-group-item'>
                        <b>Telefon Numarası:</b>
                        {business.phoneN}
                    </li>
                    <li className='list-group-item'>
                        <b>Fax:</b>
                        {business.fax}
                    </li>
                    <li className='list-group-item'>
                        <b>E-mail:</b>
                        {business.email}
                    </li>
                </ul>
            </div>
          </div>
          <Link className ="btn btn-primary my-2" to={"/"}>Back to Home</Link>
          <Link className="btn btn-outline-primary mx-2" to={`/editbusiness/${business.businessId}`}>Değiştir</Link>
          <Link className="btn btn-primary mx-2" to={`/businessprofile/${businessId}/owned`}>Listelemeler</Link>
          
    </div>
    </div>
    </div>
  )
}


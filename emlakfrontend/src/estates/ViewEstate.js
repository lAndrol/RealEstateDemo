import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function ViewEstate() {
    
    let navigate=useNavigate();

    const [estate, setEstate]=useState({
        estateType:"Kiralık",
        heating:"Klima",
        squareMeter:"",
        price:"",
        numberOfRooms:"",
        floor:"",
        numberOfFloors:"",
    })

    const{estateId}=useParams();    

    useEffect(()=>{
        loadEstate();
    },[])
    const loadEstate=async ()=>{
        const result=await axios.get(`http://localhost:8080/estate/${estateId}`)
        setEstate(result.data)
    }
    function buttonClick(){
        if(estate.customer===undefined){
            navigate(`/viewbusiness/${estate.business.businessId}`)
        }else{
            navigate(`/viewuser/${estate.customer.customerId}`)
        }
    }

  return (
    <div className='container'>
    <div className='row'>
      <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className="text-center m-4">Gayrimenkul Detayları</h2>

          <div className='card'>
            <div className='card-header'>
                <ul className='list-group list-group-flush'>
                    <li className='list-group-item'>
                        <b>Tipi:</b>
                        {estate.estateType}
                    </li>
                    <li className='list-group-item'>
                        <b>Metrekare:</b>
                        {estate.squareMeter}
                    </li>
                    <li className='list-group-item'>
                        <b>Fiyat:</b>
                        {estate.price}
                    </li>
                    <li className='list-group-item'>
                        <b>Oda Sayısı:</b>
                        {estate.numberOfRooms}
                    </li>
                    <li className='list-group-item'>
                        <b>Bulunduğu Kat:</b>
                        {estate.floor}
                    </li>
                    <li className='list-group-item'>
                        <b>Kat Sayısı:</b>
                        {estate.numberOfFloors}
                    </li>
                    <li className='list-group-item'>
                        <b>Isıtma Türü:</b>
                        {estate.heating}
                    </li>
                    <li className='list-group-item'>
                        <b>Satıcı:</b>
                        <button className='btn btn-primary m-2' onClick={buttonClick}>İncele</button>
                    </li> 
                </ul>
            </div>
          </div>
          <Link className ="btn btn-primary my-2" to={"/"}>Back to Home</Link>
    </div>
    </div>
    </div>
  )
}


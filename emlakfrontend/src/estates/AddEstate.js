import axios from 'axios'
import React, { useState,useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useBusiness } from '../businesses/BusinessContex';
import { useUser } from '../users/UserContex';

export default function AddEstate({isLoggedIn}) {

    const { userId } = useUser();
    const {businessId} = useBusiness();

    const[estateTypeSelectedOption,setEstateTypeSelectedOption]=useState('Kiralık');

    const handleEstateTypeSelectChange =(event) =>{
        setEstateTypeSelectedOption(event.target.value);
        estate.estateType=estateTypeSelectedOption;
    }

    const[heatingTypeSelectedOption,setHeatingTypeSelectedOption]=useState('Klima');

    const handleHeatingTypeSelectChange =(event) =>{
        setHeatingTypeSelectedOption(event.target.value);
        estate.heating = heatingTypeSelectedOption;
    }

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
    var hasError =false;
    var hasEmpty =false;

    const{estateType,heating,squareMeter,price,numberOfRooms,floor,numberOfFloors} = estate

   
    const onInputChange=(e)=>{
        
        setEstate({...estate,[e.target.name]:e.target.value})

    }
    const onSubmit=async (e) =>{
        e.preventDefault();
        hasError=false;
        hasEmpty=false;
        if(estate.squareMeter==""){
            emptysquareMeter();
            hasEmpty=true;
        }
        if(estate.price==""){
            emptyPrice();
            hasEmpty=true;
        }
        if(estate.numberOfRooms==""){
            emptyNumberOfRooms();
            hasEmpty=true;
        }
        if(estate.floor==""){
            emptyFloor();
            hasEmpty=true;
        }
        if(estate.numberOfFloors==""){
            emptyNumberOfFloors();
            hasEmpty=true;
        }
        if(!hasEmpty){
            estate.heating = heatingTypeSelectedOption;
            estate.estateType=estateTypeSelectedOption;
            if(isLoggedIn){
                await axios.post(`http://localhost:8080/estate/user?id=${userId}`,estate).catch(err =>{
                    console.log(err);
                    popUp();
                    hasError = true;
                })
            }else{
                await axios.post(`http://localhost:8080/estate/business?id=${businessId}`,estate).catch(err =>{
                    console.log(err);
                    popUp();
                    hasError = true;
                })
            }
            if(!hasError){
                navigate("/")
            }
        }
    };
    const emptysquareMeter=()=>{
        toast("🛑 Metrekare boş bırakılamaz.");
    }
    const emptyPrice=()=>{
        toast("🛑 Fiyat boş bırakılamaz.");
    }
    const emptyNumberOfRooms=()=>{
        toast("🛑 Oda sayısı boş bırakılamaz.");
    }
    const emptyFloor=()=>{
        toast("🛑 Bulunduğu kat boş bırakılamaz")
    }
    const emptyNumberOfFloors=()=>{
        toast("🛑 Kat sayısı boş bırakılamaz")
    }
    const popUp=()=>{
        toast("🛑 NetworkError.");
    }
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
            <h2 className="text-center m-4">Üye ol</h2>
            <form onSubmit={(e)=>onSubmit(e)}>
            <div className="mb-3">
                <label htmlFor="squareMeter" classname="form-label">
                    Metrekare
                </label>
                <input
                type={"number"}
                className="form-control"
                placeholder="Metrekareyi girin(Zorunlu)"
                name="squareMeter"
                value={squareMeter}
                inputMode="numeric"
                onChange ={(e) => onInputChange(e)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="price" classname="form-label">
                    Fiyat
                </label>
                <input
                type={"number"}
                className="form-control"
                placeholder="Fiyatını girin(Zorunlu)"
                name="price"
                value={price}
                inputMode="numeric"
                onChange ={(e) => onInputChange(e)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="numberOfRooms" classname="form-label">
                    Oda sayısı
                </label>
                <input
                type={"number"}
                className="form-control"
                placeholder="Oda sayısını girin(Zorunlu)"
                name="numberOfRooms"
                value={numberOfRooms}
                inputMode="numeric"
                onChange ={(e) => onInputChange(e)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="floor" classname="form-label">
                    Bulunduğu kat
                </label>
                <input
                type={"number"}
                className="form-control"
                placeholder="Kaçıncı katta oldugunu girin.(Zorunlu)"
                name="floor"
                value={floor}
                inputMode="numeric"
                onChange ={(e) => onInputChange(e)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="numberOfFloors" classname="form-label">
                    Kat sayısı
                </label>
                <input
                type={"number"}
                className="form-control"
                placeholder="Kat sayısı  girin.(Zorunlu)"
                name="numberOfFloors"
                value={numberOfFloors}
                inputMode="numeric"
                onChange ={(e) => onInputChange(e)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="estateType" classname="form-label">
                    Satılık/Kiralık
                </label>
                <br/>
                <select name="estateType"value={estateTypeSelectedOption} onChange={handleEstateTypeSelectChange}>
                <option value="Kiralık">Kiralık</option>
                <option value="Satılık">Satılık</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="heatingType" classname="form-label">
                    Isınma türü
                </label>
                <br/>
                <select name="heating" value={heatingTypeSelectedOption} onChange={handleHeatingTypeSelectChange}>
        <option value="Klima">Klima</option>
        <option value="Yok">Yok</option>
        <option value="Merkezi">Merkezi</option>
        <option value="Doğalgaz">Doğalgaz</option>
        
      </select>
            </div>
            <button type="submit" className="btn btn-outline-primary">Ekle</button>
        <Link className="btn btn-outline-danger mx-2" to="/">İptal</Link>
        </form>
        </div>
        
      </div>
      <ToastContainer/>
    </div>
  )
}

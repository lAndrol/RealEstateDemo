import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Navbar from '../layout/Navbar';
import { useBusiness } from './BusinessContex';

export default function BusinessLogin(props) {

    const { setBusinessId } = useBusiness();

    let navigate=useNavigate();

    var hasError =false;
    var hasEmpty =false;
    const [loginCredentials, setLoginCrentials]=useState({
        email:"",
        password:""
    })
    const{email,password} =loginCredentials

    const onInputChange=(e)=>{
        
        setLoginCrentials({...loginCredentials,[e.target.name]:e.target.value});

    }

    const onSubmit=async (e) =>{
        e.preventDefault();
        hasEmpty=false;
        if(loginCredentials.email==""){
            emptyEmail();
            hasEmpty=true;
        }
        if(loginCredentials.password==""){
            emptyPassword();
            hasEmpty=true;
        }

        if(!hasEmpty){
            await axios.post(`http://localhost:8080/business/login`,loginCredentials)
            .then(response =>{
                if(response && response.data){
                    setBusinessId(response.data.businessId)
                    props.onLogin();
                }
            })
        .catch(err =>{
            console.log(err);
            popUp();
            hasError = true;
        })
        if(!hasError){
            navigate(`/`)
        }
        }
        
    };
    const emptyEmail=()=>{
        toast("🛑 E-mail boş bırakılamaz.");
    }
    const emptyPassword=()=>{
        toast("🛑 Şifre boş bırakılamaz")
    }
    const popUp=()=>{
        toast("🛑 Yanlış E-mail yada şifre.");
    }
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
            <h2 className="text-center m-4">İşletme Giriş</h2>

            <form onSubmit={(e)=>onSubmit(e)}>
            <div className="mb-3">
                <label htmlFor="email" classname="form-label">
                    E-mail
                </label>
                <input
                type={"text"}
                className="form-control"
                placeholder="E-malinizi girin.(zorunlu)"
                name="email"
                value={email}
                onChange ={(e) => onInputChange(e)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" classname="form-label">
                    Şifre
                </label>
                <input
                type={"password"}
                className="form-control"
                placeholder="Şifrenizi girin.(zorunlu)"
                name="password"
                value={password}
                onChange ={(e) => onInputChange(e)}
                />
            </div>
            <button type="submit" className="btn btn-outline-primary">Giriş</button>
        <Link className="btn btn-outline-danger mx-2" to={`/addbusiness`}>Üye ol</Link>
        </form>
        </div>
        <ToastContainer/>
      </div>
    </div>
  )
}

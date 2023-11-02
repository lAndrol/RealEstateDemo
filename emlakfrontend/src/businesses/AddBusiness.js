import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AddBusiness() {

    let navigate=useNavigate();
    const [business, setBusiness]=useState({
        name:"",
        phoneN:"",
        fax:"",
        email:"",
        password:""
    })
    var hasError =false;
    var hasEmpty =false;
    const{name,phoneN,fax,email,password} =business

    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    const [notValidEmail,setNotValidEmail] = useState(false);

    const[notValidPwd,setNotValidPwd] = useState(false);
    const [pwdFocus,setPwdFocus] = useState(false);

    function isValidEmail(email){
        return EMAIL_REGEX.test(email);
    }
    function isValidPwd(password){
        return PWD_REGEX.test(password);
    }
   
    const onInputChange=(e)=>{
        
        setBusiness({...business,[e.target.name]:e.target.value})

    }
    const onSubmit=async (e) =>{
        e.preventDefault();
        hasError=false;
        hasEmpty=false;
        setNotValidEmail(false);
        setNotValidPwd(false);
        if(business.name==""){
            emptyName();
            hasEmpty=true;
        }
        if(business.email==""){
            emptyEmail();
            hasEmpty=true;
        }
        if(business.password==""){
            emptyPassword();
            hasEmpty=true;
        }
        if(!isValidEmail(business.email)){
            setNotValidEmail(true);
            notValidEmailPopUp();
            hasEmpty=true;
        }
        if(!isValidPwd(business.password)){
            setNotValidPwd(true);
            notValidPwdPopUp();
            hasEmpty=true;
        }
        if(!hasEmpty&&!notValidEmail&&!notValidPwd){
            await axios.post("http://localhost:8080/business",business)
        .catch(err =>{
            console.log("hata");
            popUp();
            hasError = true;
        })
            if(!hasError){
                navigate("/")
            }
        }
    };
    const emptyName=()=>{
        toast("🛑 İsim boş bırakılamaz.");
    }
    const emptyEmail=()=>{
        toast("🛑 E-mail boş bırakılamaz.");
    }
    const emptyPassword=()=>{
        toast("🛑 Şifre boş bırakılamaz")
    }
    const popUp=()=>{
        toast("🛑 E-mail sistemde kayıtlı.");
    }
    const notValidEmailPopUp=()=>{
        toast("🛑 E-mail geçerli değil.");
    }
    const notValidPwdPopUp=()=>{
        toast("🛑 Şifre geçerli değil.");
    }
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
            <h2 className="text-center m-4">İşletme</h2>
            <form onSubmit={(e)=>onSubmit(e)}>
            <div className="mb-3">
                <label htmlFor="name" classname="form-label">
                    İsim
                </label>
                <input
                type={"text"}
                className="form-control"
                placeholder="İsminizi girin.(Zorunlu)"
                name="name"
                value={name}
                onChange ={(e) => onInputChange(e)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="PhoneNumber" classname="form-label">
                    Telefon Numarası
                </label>
                <input
                type={"text"}
                className="form-control"
                placeholder="Cep Telefonu numaranızı girin."
                name="phoneN"
                value={phoneN}
                onChange ={(e) => onInputChange(e)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="fax" classname="form-label">
                    Fax
                </label>
                <input
                type={"text"}
                className="form-control"
                placeholder="Fax numarası giriniz."
                name="fax"
                value={fax}
                onChange ={(e) => onInputChange(e)}
                />
            </div>
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
                type={"text"}
                className="form-control"
                placeholder="Şifrenizi girin.(zorunlu)"
                name="password"
                value={password}
                onChange ={(e) => onInputChange(e)}
                onFocus={()=> setPwdFocus(true)}
                onBlur={()=>setPwdFocus(false)}
                />
                <p id="pwdnote" className={pwdFocus ?"instructions":"offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle}/><br/>
                    8 ile 24 karakter uzunluğunda olmalı.<br/>
                    En az bir küçük,bir büyük harf,bir sayı ve bir özel karakter içermeli<br/>
                    İçerebileceği özel karakterler: !,@,#,$,% </p>
            </div>
            <button type="submit" className="btn btn-outline-primary">Kaydol</button>
        <Link className="btn btn-outline-danger mx-2" to="/">İptal</Link>
        </form>
        </div>
        
      </div>
      <ToastContainer/>
    </div>
  )
}

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function EditBusiness() {

    let navigate=useNavigate();

    const {businessId}=useParams();

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
        
        setBusiness({...business,[e.target.name]:e.target.value});

    }
    
    useEffect(()=>{
        loadBusiness();
    },[]);

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
        if(business.lastName==""){
            emptyLastName();
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
            await axios.put(`http://localhost:8080/business/${businessId}`,business)
        .catch(err =>{
            console.log("hata");
            popUp();
            hasError = true;
        })
        if(!hasError){
            navigate(`/viewbusiness/${businessId}`)
        }
       
        }
        
    };

    const emptyName=()=>{
        toast("🛑 İsim boş bırakılamaz.");
    }
    const emptyLastName=()=>{
        toast("🛑 Soyisim boş bırakılamaz.");
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
    const loadBusiness =async ()=>{
        const result=await axios.get(`http://localhost:8080/business/${businessId}`);
        setBusiness(result.data);
    }
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
            <h2 className="text-center m-4">Bilgileri Güncelle</h2>

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
                <label htmlFor="lastName" classname="form-label">
                    Phone Number
                </label>
                <input
                type={"text"}
                className="form-control"
                placeholder="Soyisminizi girin.(Zorunlu)"
                name="phoneN"
                value={phoneN}
                onChange ={(e) => onInputChange(e)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="cellPhoneN" classname="form-label">
                    Fax
                </label>
                <input
                type={"text"}
                className="form-control"
                placeholder="Cep Telefonu numaranızı girin."
                name="fax"
                value={fax}
                onChange ={(e) => onInputChange(e)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="homePhoneN" classname="form-label">
                    E-mail
                </label>
                <input
                type={"text"}
                className="form-control"
                placeholder="Ev numaranızı girin."
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
            <button type="submit" className="btn btn-outline-primary">Güncelle</button>
        <Link className="btn btn-outline-danger mx-2" to={`/businessprofile/${businessId}`}>İptal</Link>
        </form>
        </div>
        <ToastContainer/>
      </div>
    </div>
  )
}

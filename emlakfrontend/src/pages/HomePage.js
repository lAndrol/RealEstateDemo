import React, { useEffect , useState } from 'react';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';

export default function HomePage() {

  const [estateList, setEstateList]=useState([]);
  const [displayEstateList, setDisplayEstateList]=useState([]);
  const [estate, setEstate]=useState({
    estateType:"Kiralık",
    heating:"Yok",
    squareMeter:"",
    price:"",
    numberOfRooms:"",
    floor:"",
    numberOfFloors:"",
    customer:"",
    business:""
})
  const[priceSearch,setPriceSearch]=useState({
    minPrice:"",
    maxPrice:""
  })

  const[estateTypeSelectedOption,setEstateTypeSelectedOption]=useState('Kiralık');

    const handleEstateTypeSelectChange =(event) =>{
        setEstateTypeSelectedOption(event.target.value);
        estate.estateType=estateTypeSelectedOption;
    }

    const[heatingTypeSelectedOption,setHeatingTypeSelectedOption]=useState('Yok');

    const handleHeatingTypeSelectChange =async(event) =>{
        await setHeatingTypeSelectedOption(event.target.value);
        estate.heating=heatingTypeSelectedOption;
    }
  var hasError =false;
  var hasEmpty =false;
  const onInputChange=(e)=>{
        
    setEstate({...estate,[e.target.name]:e.target.value})
    setPriceSearch({...priceSearch,[e.target.name]:e.target.value})
  }
  const{squareMeter,price,numberOfRooms,floor,numberOfFloors,customer,business,heating,estateType} = estate
    useEffect(()=>{
        loadEstates();
    },[]);
    let filteredEstates=[]
    const {estateId} = useParams();
    const filterEstates=async()=>{
      filteredEstates=[]
      for(let i=0;i<estateList.length;i++){
        let currentItem=estateList[i];
        if(!(currentItem.squareMeter==estate.squareMeter||estate.squareMeter==="")){
          continue;
        }
        if(!(currentItem.price==estate.price.toString()||estate.price==="")){
          continue;
        }
        if(!(currentItem.numberOfRooms==estate.numberOfRooms||estate.numberOfRooms==="")){
          continue;
        }
        if(!(currentItem.floor==estate.floor||estate.floor==="")){
          continue;
        }
        if(!(currentItem.numberOfFloors==estate.numberOfFloors||estate.numberOfFloors==="")){
          continue;
        }
        estate.heating=heatingTypeSelectedOption;
        if(!(currentItem.heating==estate.heating)){
          console.log(currentItem.heating);
          console.log(estate.heating+" estate");
          continue;
        }
        estate.estateType=estateTypeSelectedOption;
        if(!(currentItem.estateType==estate.estateType)){
          console.log(currentItem.estateType);
          console.log(estate.estateType+" estate");
          continue;
        }
        console.log(currentItem.squareMeter==estate.squareMeter);
        filteredEstates.push(currentItem);
      }
      setDisplayEstateList(filteredEstates);
    }
    const loadEstates=async()=>{
        const result=await axios.get("http://localhost:8080/estate");
        setEstateList(result.data);
        setDisplayEstateList(result.data);
        filteredEstates=estateList;
    }

    const deleteEstate=async(estateId)=>{
      await axios.delete(`http://localhost:8080/estate/${estateId}`);
      loadEstates();
    }
  return (
    <div className='container'>
      <div className='py-4'>
        <table className='table border shadow'>
          <thead>
            <tr>
              <th scope="col">Tip</th>
              <th scope="col">Metrekare</th>
              <th scope="col">Fiyat</th>
              <th scope="col">Oda Sayısı</th>
              <th scope="col">Bulunduğu Kat</th>
              <th scope="col">Kat Sayısı</th>
              <th scope="col">Isınma Türü</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <td><div className="mb-3">
                
            <div className="mb-3">
                <select name="estateType"value={estateTypeSelectedOption} onChange={handleEstateTypeSelectChange}
                style= {{marginTop: '5px'}}>
                <option value="Kiralık">Kiralık</option>
                <option value="Satılık">Satılık</option>
                </select>
      </div>
            </div></td>
            <td><div className="mb-3">
                <input
                type={"number"}
                className="form-control"
                name="squareMeter"
                value={squareMeter}
                inputMode="numeric"
                style= {{width: '80px', margin: '0 auto'}}
                onChange ={(e) => onInputChange(e)}
                />
            </div></td>
            <td><div className="mb-3">
                <input
                type={"number"}
                className="form-control"
                name="price"
                value={price}
                inputMode="numeric"
                style= {{width: '100px', margin: '0 auto'}}
                onChange ={(e) => onInputChange(e)}
                /></div></td>
            <td><div className="mb-3">
                <input
                type={"number"}
                className="form-control"
                name="numberOfRooms"
                value={numberOfRooms}
                inputMode="numeric"
                style= {{width: '80px', margin: '0 auto'}}
                onChange ={(e) => onInputChange(e)}
                />
            </div></td>
            <td><div className="mb-3">
                <input
                type={"number"}
                className="form-control"
                name="floor"
                value={floor}
                inputMode="numeric"
                style= {{width: '80px', margin: '0 auto'}}
                onChange ={(e) => onInputChange(e)}
                />
            </div></td>
            <td><div className="mb-3">
                <input
                type={"number"}
                className="form-control"
                name="numberOfFloors"
                value={numberOfFloors}
                inputMode="numeric"
                style= {{width: '80px', margin: '0 auto'}}
                onChange ={(e) => onInputChange(e)}
                />
            </div></td>
            <td><div className="mb-3">
            <select name="heating" value={heatingTypeSelectedOption} onChange={handleHeatingTypeSelectChange}
            style= {{marginTop: '5px'}}>
        <option value="Yok">Yok</option>
        <option value="Klima">Klima</option>
        <option value="Merkezi">Merkezi</option>
        <option value="Doğalgaz">Doğalgaz</option>
        
      </select>
            </div></td>
            <td>
              <button style= {{marginTop: '7px'}}className="btn btn-primary mx-2" onClick={()=>filterEstates()}>Ara</button>
              <button style= {{marginTop: '7px'}}className="btn btn-danger mx-2" onClick={()=>loadEstates()}>Sıfırla</button>
            </td>
          </tbody>
        </table>
      <table className="table border shadow">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Id</th>
      <th scope="col">Tip</th>
      <th scope="col">Metrekare</th>
      <th scope="col">Fiyat</th>
      <th scope="col">Oda Sayısı</th>
      <th scope="col">Bulunduğu Kat</th>
      <th scope="col">Kat Sayısı</th>
      <th scope="col">Isınma Türü</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>

    {
      displayEstateList.map((estate,index)=>(
        <tr>
        <th scope="row" key={index}>{index+1}</th>
        <td>{estate.estateId}</td>
        <td>{estate.estateType}</td>
        <td>{estate.squareMeter}</td>
        <td>{estate.price}</td>
        <td>{estate.numberOfRooms}</td>
        <td>{estate.floor}</td>
        <td>{estate.numberOfFloors}</td>
        <td>{estate.heating}</td>


        <td>
          <Link className="btn btn-primary mx-2" to={`/viewestate/${estate.estateId}`}>İncele</Link>
          
        </td>
      </tr>
      ))
    }
   
   
  </tbody>
</table>
      </div>
    </div>
  )
}

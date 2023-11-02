import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/Navbar';
import HomePage from './pages/HomePage';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import AddUser from "./users/AddUser";
import EditUser from './users/EditUser';
import ViewUser from './users/ViewUser';
import UserLogin  from './users/UserLogin';
import { useState } from 'react';
import { UserProvider } from './users/UserContex';
import AddBusiness from './businesses/AddBusiness';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'
import { BusinessProvider } from './businesses/BusinessContex';
import BusinessLogin from './businesses/BusinessLogin';
import AddEstate from './estates/AddEstate';
import ViewEstate from './estates/ViewEstate';
import UserProfile from './users/UserProfile';
import ViewBusiness from './businesses/ViewBusiness';
import EditBusiness from './businesses/EditBusiness';
import UserOwned from './users/UserOwned';
import BusinessProfile from './businesses/BusinessProfile';
import BusinessOwned from './businesses/BusinessOwned';
import EditEstate from './estates/EditEstate';

function App() {

  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [isBusinessLoggedIn,setIsBusinessLoggedIn]=useState(false);

  function handleLogin(){
    setIsLoggedIn(true);
  }
  function handleLogout(){
    setIsLoggedIn(false);
  }
  function handleBusinessLogin(){
    setIsBusinessLoggedIn(true);
  }
  function handleBusinessLogout(){
    setIsBusinessLoggedIn(false);
  }

  return (
    <BusinessProvider>
    <UserProvider>
    <div className="App">
      <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} isBusinessLoggedIn={isBusinessLoggedIn} onBusinessLogout={handleBusinessLogout}/>
      <Routes>
      <Route exact path="/" element ={<HomePage/>}/>
      <Route exact path="/adduser" element={<AddUser/>}/>
      <Route exact path="/userlogin" element={<UserLogin onLogin={handleLogin}/>}/>
      <Route exact path="/edituser/:customerId" element={<EditUser/>}/>
      <Route exact path="/viewuser/:customerId" element={<ViewUser/>}/>
      <Route exact path="/addbusiness" element={<AddBusiness/>}/>
      <Route exact path="/loginpage" element={<LoginPage/>}/>
      <Route exact path="/businesslogin" element={<BusinessLogin onLogin={handleBusinessLogin}/>}/>
      <Route exact path="/registerpage" element={<RegisterPage/>}/>
      <Route exact path="/addestate" element={<AddEstate isLoggedIn={isLoggedIn}/>}/>
      <Route exact path="/viewestate/:estateId" element={<ViewEstate/>}/>
      <Route exact path="/userprofile/:customerId" element={<UserProfile/>}/>
      <Route exact path="/viewbusiness/:businessId" element={<ViewBusiness/>}/>
      <Route exact path="/editbusiness/:businessId" element={<EditBusiness/>}/>
      <Route exact path="/userprofile/:customerId/owned" element={<UserOwned/>}/>
      <Route exact path="/businessprofile/:businessId" element={<BusinessProfile/>}/>
      <Route exact path="/businessprofile/:businessId/owned" element={<BusinessOwned/>}/>
      <Route exact path="/editestate/:estateId" element={<EditEstate/>}/>

      </Routes>
      </Router>
    </div>
    </UserProvider>
    </BusinessProvider>
  );
}

export default App;

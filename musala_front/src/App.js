import './App.css';
import 'antd/dist/antd.css';
import List from "./component/Gateway/List";
import DevicesList from "./component/Peripheral/DevicesList"
import React, { useState } from 'react';
import { Modal, notification } from 'antd';
import LoginForm from './component/LoginForm';
import image from "./img/filename.jpg"
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import './component/styles.css'
const App = () => {

  const [loging, setLoging] = useState(true);
  const [error, setError] = useState("");
  const [islog, setIslog] = useState(false);  

  const adminUser =
  {
    email:"root@gmail.com",
    password: "Vi9oy3haem5Shee1chaeM3phu4iFoaGh"
  } 

  const backgroundImageURL =image;
  const containerStyle = {
      backgroundImage:
        `url(${backgroundImageURL})`,
      width: "8000px",
      height: "8000px",
    }; 
    
  const Login = details => {
    
   if(details.email === adminUser.email && details.password === adminUser.password){
    setError("");
    setLoging(false);
    setIslog(true);    
   }else{

    setError(

      notification['warning']({
        message:"Alert",
        description:"The credentials do not match, you cannot access.",
        placement:'top'      
        })
        
    );
   }

  }

  const Logout = () => {
    
    setLoging(true)
    setIslog(false)
    
  }   

  return (

    <div className="App" >

      {(islog) ? (
      
      <Router>       
        
        <nav className="navbar navbar-dark bg-dark">          
          <div>
            <Link className="navbar-brand" to="/"> Gateway <span className="sr-only"></span></Link>
            <Link className="navbar-brand" to="/peripherals_devicesList">Peripherals devices</Link>
          </div> 
          <div className="boxes">
            <button type="button" className="btn btn-primary"   onClick={() => Logout()} >Logout</button>
          </div>            
        </nav> 

        <div className="card">           
          <Routes>
            <Route exact path='/*' element={<List/>} />           
            <Route  path='/peripherals_devicesList' element={<DevicesList/>} /> 
          </Routes>
        </div>     
      
      </Router> 
      
      

        ) : (

          <div style={containerStyle}>
          <Modal
          centered
          title="Welcome to Musala Soft Test "
          footer={null}
          closable={false}
          open={loging}
          width={800}
          >
          <LoginForm Login={Login} error={error} />    
          </Modal>
          </div>
        )
        
      }

    
    </div>
  );
}

export default App;

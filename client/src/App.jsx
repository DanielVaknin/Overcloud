import axios from 'axios';
import { useState } from 'react';
import Loginform from './components/Loginform';
import React from "react";
import Register from './components/Register';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Footer from './components/Footer';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import { Link } from "react-router-dom"; 


export default function App() {

  
  const [user,setUser] = useState({name:"", email:""});
  const [error, setError] = useState("");

  const Login = async(details) =>{
    console.log(details);
    await axios.post('http://localhost:8080/api/auth/login',details)
    .then(response => setUser({
      email: response.details.email,
      password: response.details.password

    })
    ).catch(error => {
      setError("user doesn't exist");
    
  });
   
  }
  const Logout = ()=>{
    setUser({name:"", email:"", password: ""});
  }

  return (
    <BrowserRouter>
      <div>
        <Header />
        {/* Page Content */}
        <div className="container">
          {/* /.col-lg-3 */}
         
          <Switch>
            <Route path="/Loginform" component={() => <Loginform />} />
            <Route path="/Register" component={() => <Register />} />
            <Route path="/Dashboard" component={() => <Dashboard />} />
          </Switch>
        </div>

        {/* /.container */}
        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
 
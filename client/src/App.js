import axios from 'axios';
import { useState } from 'react';
import Loginform from './components/Loginform';
import React from "react";
import Register from './components/Register';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Footer from './components/Footer';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

export default function App() {

  
  const [user,setUser] = useState({name:"", email:""});
  const [error, setError] = useState("");

  const Login = async(details) =>{
    console.log(details);
    await axios.post('http://localhost:8080/api/auth/login',details)
    .then(response => setUser({
      email: response.details.email,
      password: response.details.password
    })).catch(error => {
      setError("user doesn't exist");
      console.log("user doesn't exist");

      
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
          <div className="row">
           
            {/* /.col-lg-3 */}
            {(user.email !=="") ? (
              <div className = "welcome">
                <Route path="/" exact component={Dashboard} />
                <button onClick = {Logout}>Logout</button>
                </div>
            ):(
              <Loginform Login = {Login} error = {error}/>
            )}
            <Switch>
              <Route path="/Loginform" component={() => <Loginform/>} />
            </Switch>           
          </div>
          {/* /.row */}
        </div>
        {/* /.container */}
        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
 
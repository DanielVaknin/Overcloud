import Loginform from './components/Loginform';
import React from "react";
import Register from './components/Register';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Footer from './components/Footer';
import Header from './components/Header';
import Dashboard from './components/Dashboard';


export default function App() {

  
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
 
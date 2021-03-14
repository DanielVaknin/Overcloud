import React, { useState } from 'react';
import Loginform from './components/Loginform';
import Register from './components/Register';
import AddCloudAccount from './components/AddCloudAccount';
import CloudAccounts from './components/CloudAccounts';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Footer from './components/Footer';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import { useHistory } from "react-router-dom";


export default function App() {
  const history = useHistory();
  const [connectedUser, setConnectedUser] = useState(JSON.parse(localStorage.getItem("user")))

  
  return (
    <BrowserRouter  history={history}>
      <div>
        <Header connectedUser={connectedUser}/>
        {/* Page Content */}
        <div className="container">
          {/* /.col-lg-3 */}
         
          <Switch>
            <Route path="/Loginform" render={() => <Loginform setConnectedUser={(user) => setConnectedUser(user)} />}  />
            <Route path="/Register" component={() => <Register />} />
            <Route path="/AddCloudAccount" component={() => <AddCloudAccount />} />
            <Route path="/CloudAccounts" component={() => <CloudAccounts />} />
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
 
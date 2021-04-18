import React, {useState} from 'react';
import Loginform from './components/Loginform';
import Register from './components/Register';
import AddCloudAccount from './components/AddCloudAccount';
import CloudAccounts from './components/CloudAccounts';
import Recommendations from './components/Recommendations';
import RecommendationDetails from './components/RecommendationDetails';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Footer from './components/Footer';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import {useHistory} from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {
    const history = useHistory();
    const [connectedUser, setConnectedUser] = useState(localStorage.getItem("user"))
    //const [cloudAccountDetails, setCloudAccountDetails] = useState(JSON.parse(localStorage.getItem("cloudAccount")));

    return (
        <BrowserRouter history={history}>
            <div>
                <Header connectedUser={connectedUser}/>
                <div className="container">
                    <Switch>
                        <Route path="/Loginform"
                               render={() => <Loginform setConnectedUser={(user) => setConnectedUser(user)}/>}/>
                        <Route path="/Register" component={() => <Register/>}/>
                        <Route path="/AddCloudAccount" component={() => <AddCloudAccount/>}/>
                        <Route path="/CloudAccounts" component={() => <CloudAccounts/>}/>
                        <Route path="/:cloudAccountId/Recommendations" render={() => <Recommendations/>}/>
                        <Route path="/:cloudAccountId/Recommendation/:recommendationId"
                               component={() => <RecommendationDetails/>}/>
                        <Route path="/Dashboard" component={() => <Dashboard/>}/>
                    </Switch>
                </div>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

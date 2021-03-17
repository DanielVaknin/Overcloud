import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./CloudAccounts.css";
import axios from "axios";
//import history from '../History';
import { useHistory } from "react-router-dom";
import Card from 'react-bootstrap/Card';

function CloudAccounts(props) {
    const history = useHistory();
    const [accounts, setAccounts] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8080/api/cloud/accounts`).then(res => {
            console.log(res.data);
            setAccounts(res.data);
        }
        )
    }, [])

    const recommendations = (cloudAccount) => {
        console.log(cloudAccount._id);
        localStorage.setItem("cloudAccount", JSON.stringify(cloudAccount));
        history.push(`/${cloudAccount._id}/Recommendations`);
    }

    return (
        <div class="font" >
            <h2>Cloud Accounts</h2>
            
                {
                    accounts.map((account, index) => {
                        return (
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>Display Name: {account.displayName}</Card.Title>
                                    <Card.Text>
                                    <h6>Cloud Provider: {account.cloudProvider}</h6>
                                    <h6>Access Key: {account.accessKey}</h6>
                                    </Card.Text>
                                    <Button class="btn btn-info" onClick={() => recommendations(account)}>Recommendations</Button>
                                </Card.Body>
                            </Card>
                            // <div className="col-lg-4" >
                            //     <h5>Display Name: {account.displayName}</h5>
                            // 	<h5>Cloud Provider: {account.cloudProvider}</h5>
                            // 	<h5>Access Key: {account.accessKey}</h5>
                            // 	<Button onClick={() => recommendations(account._id)}>Recommendations</Button>
                            // </div>
                        )
                    })
                }
            
        </div >
    );
}
export default CloudAccounts;

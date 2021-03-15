import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./CloudAccounts.css";
import axios from "axios";
//import history from '../History';
import { useHistory } from "react-router-dom";


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

	const recommendations = (cloudId) => {
		console.log(cloudId);
        history.push({ pathname: `/${cloudId}/Recommendations`, cloudId: cloudId });
    }

	return (
        <div style={{ marginTop: "60px", marginLeft: "130px" }}>
          	Cloud Accounts
            <div className="row" >
                {
                    accounts.map((account, index) => {
                        return (
                            <div className="col-lg-4">
                                <h2>Display Name: {account.displayName}</h2>
								<h2>Cloud Provider: {account.cloudProvider}</h2>
								<h2>Access Key: {account.accessKey}</h2>
								<Button onClick={() => recommendations(account._id)}>Recommendations</Button>
                            </div>
                        )
                    })
                }
            </div>
        </div >
	);
}
export default CloudAccounts;

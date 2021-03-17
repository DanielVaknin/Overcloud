import React, { useState, useEffect } from "react";
//import "./Recommendations.css";
import axios from "axios";
//import history from '../History';
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';


function Recommendations(props) {
    const history = useHistory();

    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState("");
    const [cloudAccountDetails, setCloudAccountDetails] = useState(JSON.parse(localStorage.getItem("cloudAccount")));
   
    useEffect(() => {
        console.log(cloudAccountDetails);
        axios.get(`http://localhost:8080/api/cloud/${cloudAccountDetails._id}/recommendations`).then(
            res => {
                setRecommendations(res.data.recommendations);
                console.log(res.data.recommendations);
            }
        )
    }, [])

    const details = (recommendationId) => {
        console.log(recommendationId);
        history.push({ pathname: `/${cloudAccountDetails._id}/recommendation/${recommendationId}`, recommendationId: recommendationId, cloudId: cloudAccountDetails._id });
    }


    return (
        <div class="font">
        <h2>Recommendations for account {cloudAccountDetails.displayName} </h2>
        <Table striped bordered >
            <thead class="font">
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Collect Time</th>
                    <th scope="col">Total Savings</th>
                </tr>
            </thead>
            <tbody>
                {
                    recommendations.map((recommendation, index) => {
                        return (
                            <tr class="font">
                                <td>{recommendation.name}</td>
                                <td>{recommendation.collectTime}</td>
                                <td>{recommendation.totalPrice}$</td>
                                <td> 
                                    <Button onClick={() => details(recommendation._id.$oid)}>Details</Button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
        </div>
    );
}
export default Recommendations;
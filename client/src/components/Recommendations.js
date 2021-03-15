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
    var cloudId = history.location.cloudId

    //localCloudUser =
    useEffect(() => {
        
        axios.get(`http://localhost:8080/api/cloud/${cloudId}/recommendations`).then(
            res => {
                //console.log(res.data.orders)
                setRecommendations(res.data.recommendations);
                console.log(res.data.recommendations);
                // if (res.data.recommendations)
                //     SetStatus(res.data.status);
                // setDates(res.data.dates);
            }
        )
    }, [])

    const detailes = (recommendationId) => {
        console.log(recommendationId);
        history.push({ pathname: `/${cloudId}/recommendations/${recommendationId}`, recommendationId: recommendationId, cloudId: cloudId });
    }


    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Collect Time</th>
                </tr>
            </thead>
            <tbody>
                {
                    recommendations.map((recommendation, index) => {
                        return (
                            <tr>
                                <td>{recommendation.name}</td>
                                <td>{recommendation.collectTime}</td>
                                <td> 
                                    <Button onClick={() => detailes(recommendation._id.$oid)}>Detailes</Button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    );
}
export default Recommendations;
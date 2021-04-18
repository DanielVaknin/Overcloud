import React, {useState, useEffect} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';


function Recommendations() {
    const history = useHistory();

    const [recommendations, setRecommendations] = useState([]);
    const [cloudAccountDetails, setCloudAccountDetails] = useState(JSON.parse(localStorage.getItem("cloudAccount")));

    useEffect(() => {
        console.log(cloudAccountDetails);
        axios.get(`http://localhost:5000/recommendations`, {
            params: {
                cloud_account: cloudAccountDetails['_id']
            }
        }).then(
                res => {
                    setRecommendations(res.data['recommendations']);
                    console.log(res.data['recommendations']);
                }
            )
    }, [])

    const details = (recommendationType) => {
        console.log(recommendationType);
        history.push({
            pathname: `/${cloudAccountDetails._id}/recommendation/${recommendationType}`,
            state: {
                recommendationType: recommendationType,
                cloudId: cloudAccountDetails._id
            }
        });
    }


    return (
        <div className="font">
            <h2>Recommendations for account {cloudAccountDetails.displayName} </h2>
            <Table striped bordered>
                <thead className="font">
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
                            <tr className="font">
                                <td>{recommendation.name}</td>
                                <td>{recommendation.collectTime}</td>
                                <td>{recommendation.totalPrice}$</td>
                                <td>
                                    <Button onClick={() => details(recommendation['type'])}>Details</Button>
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
import React, {useState, useEffect} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function RecommendationDetails(props) {
    const history = useHistory();


    const [recommendationDetails, setRecommendationDetails] = useState([]);
    const [recommendationName, setRecommendationName] = useState("");
    const [recommendationDetailsKeys, setRecommendationDetailsKeys] = useState([]);
    //const [columns, setColumns] = useState([]);
    //const [columnsToHide, setColumnsToHide] = useState(["_id"]);
    var cloudId = history.location.cloudId
    var recommendationId = history.location.recommendationId

    const goBack = () => {
        history.push(`/${cloudId}/Recommendations`);
    }

    useEffect(() => {

        axios.get(`http://localhost:8080/api/cloud/${cloudId}/recommendations/${recommendationId}`).then(
            res => {
                console.log(res.data)
                console.log(res.data.recommendations)
                setRecommendationDetails(res.data.recommendations[0].data);
                setRecommendationName(res.data.recommendations[0].name);
                var detailsJson = (res.data.recommendations[0].data[0]);
                let detailsKeys = Object.keys(detailsJson);
                detailsKeys.push("operation");
                setRecommendationDetailsKeys(detailsKeys);
                //setRecommendationDetailsKeys(Object.keys(detailsJson));
                console.log(res.data.recommendations);
                //console.log(detailsJson);
                //console.log(recommendationDetailsKeys);
                //mapDynamicColumns();
                // if (res.data.recommendations)
                //     SetStatus(res.data.status);
                // setDates(res.data.dates);
            }
        )
    }, [])

    // const removeData = (id) => {

    //     axios.delete(`${URL}/${id}`).then(res => {
    //         const del = employees.filter(employee => id !== employee.id)
    //         setEmployees(del)
    //     })
    // }

    const renderHeader = () => {
        //var detailsJson = (recommendationDetails[0]);
        let headerElement = recommendationDetailsKeys;


        console.log(headerElement);

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const renderBody = () => {
        console.log(recommendationDetails);
        return recommendationDetails.map((item, index) => {
            return (
                <tr key={index}>
                    {
                        Object.keys(item).map((key, index) => {
                            return (
                                <td>{item[key]}</td>
                            )

                        })

                    }
                    <td className='opration'>
                        <Button className='button'>Remediate</Button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <div className="font">
            <Button onClick={goBack}>Back</Button>
            <h1 id='title'>{recommendationName} to delete</h1>
            <Table striped bordered>
                <thead className="font">
                <tr>{renderHeader()}</tr>
                </thead>
                <tbody className="font">
                {renderBody()}
                </tbody>
            </Table>
        </div>
    )

}

export default RecommendationDetails;
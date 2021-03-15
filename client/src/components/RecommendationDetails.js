import React, { useState, useEffect, Component } from "react";
//import "./Recommendations.css";
import axios from "axios";
//import history from '../History';
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';


function RecommendationDetails(props) {
    console.log('HELLO')
    const history = useHistory();


    const [recommendationDetails, setRecommendationDetails] = useState([]);
    //const [columns, setColumns] = useState([]);
    //const [columnsToHide, setColumnsToHide] = useState(["_id"]);
    const [error, setError] = useState("");
    var cloudId = history.location.cloudId
    var recommendationId = history.location.recommendationId

    const goBack = (event) => {
        history.push(`/${cloudId}/Recommendations`);
    }

    
    useEffect(() => {

        axios.get(`http://localhost:8080/api/cloud/${cloudId}/recommendations/${recommendationId}`).then(
            res => {
                console.log(res.data)
                setRecommendationDetails(res.data.recommendations);
                console.log(res.data.recommendations);
                //mapDynamicColumns();
                // if (res.data.recommendations)
                //     SetStatus(res.data.status);
                // setDates(res.data.dates);
            }
        )
    }, [])

    // const mapDynamicColumns = () => {
    //     let tempColumns = [];
    //     recommendationDetails.forEach((detail) => {
    //         Object.keys(detail).forEach((col) => {
    //             if (!tempColumns.includes(col)) {
    //                 tempColumns.push(col);
    //             }
    //         });
    //         setColumns(tempColumns);
    //     });
    // };

    // const addTableRow = (detail) => {
    //     let row = [];
    //     columns.forEach((col) => {
    //         if (!columnsToHide.includes(col)) {
    //             row.push(
    //                 Object.keys(detail).map((item) => {
    //                     if (detail[item] && item === col) {
    //                         return detail[item];
    //                     } else if (item === col) {
    //                         return "No Value";
    //                     }
    //                 })
    //             );
    //             row = filterDeepUndefinedValues(row);
    //         }
    //     });

    //     return row.map((item, index) => {
    //         // console.log(item, "item ?");
    //         return (
    //             <td
    //                 key={`${item}--${index}`}
    //                 className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
    //             >
    //                 {item}
    //             </td>
    //         );
    //     });
    // };

    // const mapTableColumns = () => {
    //     return columns.map((col) => {
    //         if (!columnsToHide.includes(col)) {
    //             const overridedColumnName = overrideColumnName(col);
    //             return (
    //                 <th
    //                     key={col}
    //                     scope="col"
    //                     className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    //                 >
    //                     {overridedColumnName}
    //                 </th>
    //             );
    //         }
    //     });
    // };

    // const filterDeepUndefinedValues = (arr) => {
    //     return arr
    //         .map((val) =>
    //             val.map((deepVal) => deepVal).filter((deeperVal) => deeperVal)
    //         )
    //         .map((val) => {
    //             if (val.length < 1) {
    //                 val = ["-"];
    //                 return val;
    //             }
    //             return val;
    //         });
    // };

    // // if you want to change the text of the col you could do here in the .map() with another function that handle the display text

    // const overrideColumnName = (colName) => {
    //     switch (colName) {
    //         case "phoneNumber":
    //             return "Phone number";
    //         case "lastname":
    //             return "Custom Last Name";
    //         default:
    //             return colName;
    //     }
    // };

    // const createTable = (results) => {
    //     return (
    //         <table class="min-w-full divide-y divide-gray-200">
    //             <thead>
    //                 <tr>{mapTableColumns()}</tr>
    //             </thead>
    //             <tbody>
    //                 {results.map((result, index) => {
    //                     return <tr key={result._id}>{addTableRow(result)}</tr>;
    //                 })}
    //             </tbody>
    //         </table>
    //     );
    // };



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
                    recommendationDetails.map((detail, index) => {
                        return (
                            Object.keys(detail.object).map((key, index) => {
                                return (
                                    <div key={index}>
                                        <h1>{key} : {detail.object[key]}</h1>
                                        <Button type="button" id="goBack" variant="primary" style={{ position: 'absolute' }} onClick={(event) => goBack(event)}>Back</Button>
                                    </div>
                                )
                            })
                        )
                    })

                }
            </tbody>
        </Table>
    );
}
export default RecommendationDetails;
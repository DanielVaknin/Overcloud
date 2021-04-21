import React, { useState, useEffect } from "react";
//import "./Recommendations.css";
import axios from "axios";
//import history from '../History';
import { useHistory, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
// import Table from 'react-bootstrap/Table';
import { Table } from "antd";
import { batch } from "react-redux";

function RecommendationDetails(props) {
  const history = useHistory();

  const [recommendationDetails, setRecommendationDetails] = useState([]);
  const [recommendationName, setRecommendationName] = useState("");
  const [recommendationDetailsKeys, setRecommendationDetailsKeys] = useState([]);
  const [recommendationType, setRecommendationType] = useState("");
  const [cloudId, setCloudId] = useState("");

  //const [columns, setColumns] = useState([]);
  //const [columnsToHide, setColumnsToHide] = useState(["_id"]);
  const [error, setError] = useState("");

  //Receive the params from previous page - Recommendations
  const { recType, cloudAccountId } = useParams();

  const goBack = () => {
    history.push(`/Recommendations/${cloudId}`);
  };
  useEffect(() => {
    batch(() => {
      setRecommendationType(recType);
      setCloudId(cloudAccountId);
    });
  }, []);

  useEffect(() => {
    if (!!recommendationType) {
      //if exist (!!)
      axios
        .get(`http://localhost:5000/recommendations`, {
          params: {
            cloud_account: cloudId,
            recommendation_type: recommendationType,
          },
        })
        .then((res) => {
          console.log(res.data);
          console.log(res.data.recommendations);
          setRecommendationDetails(res.data.recommendations[0].data);
          setRecommendationName(res.data.recommendations[0].name);
          var detailsJson = res.data.recommendations[0].data[0];
          let detailsKeys = Object.keys(detailsJson);
          //detailsKeys.push("operation");
          const columns = detailsKeys.map((item) => ({
            title: item.toLocaleUpperCase(),
            dataIndex: item,
            key: item,
          }));
          //   let operation = {
          //     title: "Action",
          //     dataIndex: "",
          //     key: "action",
          //     render: () => <Button>Remediate</Button>,
          //   };
          //columns.push(operation);
          setRecommendationDetailsKeys(columns);
          console.log(columns);
        });
    }
  }, [recommendationType]);

  const remediate = () => {
    axios
      .get(`http://localhost:5000/recommendations/remediate`, {
        params: {
          cloud_account: cloudId,
          recommendation_type: recommendationType,
        },
      })
      .then((res) => {
        console.log(res);
      });
  };

  // const removeData = (id) => {

  //     axios.delete(`${URL}/${id}`).then(res => {
  //         const del = employees.filter(employee => id !== employee.id)
  //         setEmployees(del)
  //     })
  // }

  // const renderHeader = () => {
  //     //var detailsJson = (recommendationDetails[0]);
  //     let headerElement = recommendationDetailsKeys;

  //     console.log(headerElement);

  //     return headerElement.map((key, index) => {
  //         return <th key={index}>{key.toUpperCase()}</th>
  //     })
  // }

  // const renderBody = () => {
  //     console.log(recommendationDetails);
  //     return recommendationDetails.map((item, index) => {
  //         return (
  //             <tr key={index}>
  //                 {
  //                     Object.keys(item).map((key, index) => {
  //                         return (
  //                             <td>{item[key]}</td>
  //                         )

  //                     })

  //                 }
  //                 <td className='operation'>
  //                     <Button className='button'>Remediate</Button>
  //                 </td>
  //             </tr>
  //         )
  //     })
  // }
  // console.log({recommendationDetails,recommendationDetailsKeys});
  return (
    <div class="font">
      <Button onClick={goBack}>Back</Button>
      <h1 class="font" id="title">
        {recommendationName} to delete
      </h1>
      {recommendationDetailsKeys.length && (
        <Table title={() => <Button onClick={remediate}>Remediate</Button>} dataSource={recommendationDetails} columns={recommendationDetailsKeys} />
      )}
    </div>
  );

  {
    /* <Table striped bordered>
        <thead class="font">
            <tr>{renderHeader()}</tr>
        </thead>
        <tbody class="font">
            {renderBody()}
        </tbody>
    </Table> */
  }

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

  //console.log(recommendationDetails);
  // return (
  //     // <Table striped bordered hover>
  //     //     <thead>
  //     //         <tr>
  //     //             <th scope="col">Name</th>
  //     //             <th scope="col">Collect Time</th>
  //     //         </tr>
  //     //     </thead>
  //     //     <tbody>
  //     //         {
  //     //             recommendationDetails.map((item, index) => {
  //     //                 return (
  //     //                     Object.keys(item).map((key, index) => {
  //     //                         return (
  //     //                             <div key={index}>
  //     //                                 <h8>{key} : {item[key]}</h8>
  //     //                             </div>
  //     //                         )

  //     //                     })
  //     //                 )
  //     //             })

  //     //         }
  //     //     </tbody>
  //     // </Table>

  //     <div class="font" >
  //         <h2>{recommendationName} to delete</h2>
  //         <Button type="button" id="goBack" variant="primary" style={{ position: 'absolute' }} onClick={goBack}>Back</Button>
  //         {/* <CardGroup> */}
  //         {
  //             recommendationDetails.map((item, index) => {
  //                 return (
  //                     <Card style={{ width: '18rem' }}>
  //                         <Card.Body>
  //                             {/* <Card.Title>Display Name: {account.displayName}</Card.Title> */}
  //                             <Card.Text key={index}>
  //                                 <ul>
  //                                     {

  //                                         Object.keys(item).map((key, index) => {
  //                                             return (

  //                                                 <p>{key} : {item[key]}</p>

  //                                             )
  //                                         })
  //                                     }
  //                                 </ul>
  //                             </Card.Text>
  //                             <Button type="button" variant="primary" style={{ position: 'absolute' }} >Remidiate</Button>
  //                         </Card.Body>
  //                     </Card>
  //                 )
  //             })
  //         }
  //         {/* </CardGroup> */}

  //     </div >

  // );
}
export default RecommendationDetails;

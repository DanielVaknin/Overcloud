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
          console.log(res.data.recommendations[0].data.length);
          //If the recommendation is not empty
          let columns = [];
          if (!(res.data.recommendations[0].data.length == 0)) {
            var detailsJson = res.data.recommendations[0].data[0];
            let detailsKeys = Object.keys(detailsJson);
            //detailsKeys.push("operation");
            columns = detailsKeys.map((item) => ({
              title: item.toLocaleUpperCase(),
              dataIndex: item,
              key: item,
            }));
          }
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
    alert(recommendationType +'will be remediated!')
    axios
      .post(`http://localhost:5000/recommendations/remediate`, 
      {       
          cloud_account: cloudId,
          recommendation_type: recommendationType,       
      })
      .then((res) => {
        console.log(res);
      });
  };

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
}
export default RecommendationDetails;

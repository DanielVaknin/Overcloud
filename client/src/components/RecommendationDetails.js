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
          // let arr = res.data.recommendations[0].data
          // arr.forEach(element => {
          //   element.totalPrice = element.totalPrice + "$"
          // });
          setRecommendationDetails(res.data.recommendations[0].data);
          setRecommendationName(res.data.recommendations[0].name);
          console.log(res.data.recommendations[0].data.length);
          //If the recommendation is not empty
          let columns = [];
          if (!(res.data.recommendations[0].data.length === 0)) {
            var detailsJson = res.data.recommendations[0].data[0];
            let detailsKeys = Object.keys(detailsJson);
            columns = detailsKeys.map((item) => ({
              title: item.charAt(0).toLocaleUpperCase() + item.slice(1).split(/(?=[A-Z])/).join(" "),
              dataIndex: item,
              key: item,
            }));
          }
          setRecommendationDetailsKeys(columns);
          console.log(columns);
        }).catch((e) => {
          //Alert error to the user
          console.log(e);
          setError(e.response.data.error);
          alert(error);
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
      }).catch((e) => {
        //Alert error to the user
        console.log(e);
        setError(e.response.data.error);
        alert(error);
      });
  };

  return (
    <div class="font">
      <Button onClick={goBack}>Back</Button>
      <h1 style={{ color: "#4bb5db" }} id="title">
        {recommendationName} to delete
      </h1>
      {recommendationDetailsKeys.length && (
        <Table title={() => <Button onClick={remediate}>Remediate</Button>} dataSource={recommendationDetails} columns={recommendationDetailsKeys} />
      )}
    </div>
  );
}
export default RecommendationDetails;

import React, {useState, useEffect} from "react";
import axios from "axios";
import { Table } from "antd";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";

function Recommendations(props) {
  const history = useHistory();

  const [recommendations, setRecommendations] = useState([]);
  const [recommendationKeys, setRecommendationKeys] = useState([]);
  const [error, setError] = useState("");
  const [cloudAccountDetails, setCloudAccountDetails] = useState(JSON.parse(localStorage.getItem("cloudAccount")));

  useEffect(() => {
    console.log(cloudAccountDetails);
    axios
      .get(`http://localhost:5000/recommendations`, {
        params: {
          cloud_account: cloudAccountDetails["_id"],
        },
      })
      .then((res) => {
        setRecommendations(res.data.recommendations);
        console.log(res.data.recommendations);
        var recommendationJson = res.data.recommendations[0];
        delete recommendationJson["data"];
        delete recommendationJson["accountId"];
        console.log(recommendationJson);
        let recommendationKeys = Object.keys(recommendationJson);
        let columns = recommendationKeys.map((item) => ({
          title: item.toLocaleUpperCase(),
          dataIndex: item,
          key: item,
        }));
        let operation = {
          title: "Action",
          dataIndex: "",
          key: "action",
          render: (text, record) => (
            <Button
              onClick={(e) => {
                details(record.type, e);
              }}
            >
              Details
            </Button>
          ),
        };
        columns.push(operation); //add action title to columns array
        columns = columns.filter((item) => item.title !== "_ID"); //remove unnecessary title ID from columns array
        setRecommendationKeys(columns);
        console.log(columns);
      });
  }, []);

  const details = (recommendationType, e) => {
    e.preventDefault();
    console.log(recommendationType);
    history.push({
      pathname: `/${cloudAccountDetails._id}/recommendation/${recommendationType}`,
      recommendationType: recommendationType,
      cloudId: cloudAccountDetails._id,
    });
  };

  const scanRecommendations = (cloudAccountId) => {
    //Scan for Recommendations
    axios
      .post("http://localhost:5000/recommendations/scan", {
        cloud_account: cloudAccountId,
      })
      .then((response) => {
        console.log(response);
        //Redirect to CloudAccounts page only after scan good response
        alert("Scan in Progress");
      })
      .catch((e) => {
        //Alert error o the user
        console.log(e);
        setError(e.response.data);
        alert(error);
      });
  };


  const goBack = () => {
    history.push(`/CloudAccounts`);
  };

  return (
    <div class="font">
      <Button onClick={goBack}>Back</Button>
      <Button onClick={() => scanRecommendations(cloudAccountDetails._id)}>Scan</Button>
      <h1 class="font" id="title">
        Recommendations for account {cloudAccountDetails.displayName}
      </h1>
      {recommendationKeys.length && <Table dataSource={recommendations} columns={recommendationKeys} />}
    </div>
  );
}
export default Recommendations;

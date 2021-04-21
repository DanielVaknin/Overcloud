import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./CloudAccounts.css";
import axios from "axios";
//import history from '../History';
import { useHistory } from "react-router-dom";
import { Card, Avatar } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined, SearchOutlined, CloudServerOutlined } from "@ant-design/icons";

function CloudAccounts(props) {
  const history = useHistory();
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState("");
  const { Meta } = Card;

  useEffect(() => {
    axios.get(`http://localhost:8080/api/cloud-accounts`).then((res) => {
      console.log(res.data);
      setAccounts(res.data);
    });
  }, []);

  const recommendations = (cloudAccount) => {
    console.log(cloudAccount._id);
    localStorage.setItem("cloudAccount", JSON.stringify(cloudAccount));
    history.push(`/Recommendations/${cloudAccount._id}`);
  };

  const scanRecommendations = (cloudAccount) => {
    //Scan for Recommendations
    axios
      .post("http://localhost:5000/recommendations/scan", {
        cloud_account: cloudAccount._id,
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

  return (
    <div class="font" >
      <h2 style={{color: "white"}}>Cloud Accounts </h2>

      {accounts.map((account, index) => {
        // return (
        //     <Card style={{ width: '18rem' }}>
        //         <Card.Body>
        //             <Card.Title>Display Name: {account.displayName}</Card.Title>
        //             <Card.Text >
        //             <h7>Cloud Provider: {account.cloudProvider}</h7>
        //             <h7>Access Key: {account.accessKey}</h7>
        //             </Card.Text>
        //             <Button class="btn btn-info" onClick={() => recommendations(account)}>Recommendations</Button>
        //         </Card.Body>
        //     </Card>
        //     // <div className="col-lg-4" >
        //     //     <h5>Display Name: {account.displayName}</h5>
        //     // 	<h5>Cloud Provider: {account.cloudProvider}</h5>
        //     // 	<h5>Access Key: {account.accessKey}</h5>
        //     // 	<Button onClick={() => recommendations(account._id)}>Recommendations</Button>
        //     // </div>
        // )
        return (
          <Card
            style={{ width: 300 }}
            // cover={<img alt="example" src="https://www.ctera.com/wp-content/uploads/2018/12/aws_logo.png" />}
            actions={[
              <SearchOutlined key="setting" onClick={() => scanRecommendations(account)}/>,
              <EditOutlined key="edit" />,
              <CloudServerOutlined key="ellipsis" onClick={() => recommendations(account)}/>,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://www.ctera.com/wp-content/uploads/2018/12/aws_logo.png" />}
              title={account.displayName}
              description={"Access Key:\n" + account.accessKey}
            />
            {/* <Button onClick={() => recommendations(account._id)}>Recommendations</Button> */}
          </Card>
        );
      })}
    </div>
  );
}
export default CloudAccounts;

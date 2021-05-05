import React, { useState } from "react";
import "./AddCloudAccount.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

function AddCloudAccount(props) {
  const history = useHistory();

  const [details, setDetails] = useState({ displayName: "", cloudProvider: "", accessKey: "", secretKey: "", scanInterval: "" });
  //const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmitClick = (e) => {
    e.preventDefault();
    sendDetailsToServer();
    // if (!error)
    // 	history.push('/CloudAccounts')
  };

  const sendDetailsToServer = async () => {
    console.log(details);
    //Add cloud account to DB
    await axios
      .post("http://localhost:5000/cloud-accounts/validate", {
        cloudProvider: details.cloudProvider,
        accessKey: details.accessKey,
        secretKey: details.secretKey,
        scanInterval: details.scanInterval
      })
      .then((validateResponse) => {
        console.log(validateResponse);
        //Validate cloud account
        axios
          .post("http://localhost:8080/api/cloud-accounts", details)
          .then((addAccountResponse) => {
            console.log(addAccountResponse);
            console.log(addAccountResponse.data._id);

            //Call ScanScheduler API
            axios
                .post("http://localhost:5000/recommendations/schedule-scan", {
                  cloud_account: addAccountResponse.data._id,
                    scan_interval: details.scanInterval
                })
                .then((scheduleScanResponse) => {
                  console.log(scheduleScanResponse);
                  axios
                      .post("http://localhost:5000/recommendations/scan", {
                        cloud_account: addAccountResponse.data._id,
                      })
                      .then((scanResponse) => {
                        console.log(scanResponse);
                        //Redirect to CloudAccounts page only after scan good response
                        history.push("/CloudAccounts");
                      })
                })
              .catch((scanError) => {
                //Alert error o the user
                console.log(scanError);
                setError(scanError.response.data.error);
                alert(error);
              });
          })
          .catch((addAccountError) => {
            //Alert error o the user
            console.log(addAccountError.response.data);
            setError(addAccountError.response.data.error);
            alert(error);
          });
      })
      .catch((validateError) => {
        console.log(validateError.response.data);
        if (validateError.response.status === 500) {
          console.log(validateError.response.data.error);
          setError(validateError.response.data.error);
          alert(error);
        }
      });
  };

  return (
    <form className = "addAccount" onSubmit={handleSubmitClick}>
      <title> Add Cloud Account Page</title>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
        integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
        crossorigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
        integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
        crossorigin="anonymous"
      />
      <link rel="stylesheet" type="text/css" href="styles.css" />
      <div className="container">
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              <h3> Add Cloud Account </h3>{" "}
            </div>
            <div className="card-body">
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-user"> </i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Display Name"
                  value={details.displayName}
                  onChange={(e) => {
                    setDetails({ ...details, displayName: e.target.value });
                  }}
                />
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-envelope"> </i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Cloud Provider"
                  value={details.cloudProvider}
                  onChange={(e) => setDetails({ ...details, cloudProvider: e.target.value })}
                />
              </div>

              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-key"> </i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Access Key"
                  value={details.accessKey}
                  onChange={(e) => setDetails({ ...details, accessKey: e.target.value })}
                />
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-key"> </i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Secret Key"
                  value={details.secretKey}
                  onChange={(e) => setDetails({ ...details, secretKey: e.target.value })}
                />
              </div>

              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i class="fas fa-clock"> </i>
                  </span>
                </div>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Scan Interval"
                    value={details.scanInterval}
                    onChange={(e) => setDetails({ ...details, scanInterval: e.target.value })}
                />
              </div>
              <div className="form-group text-center">
                <input type="submit" value="Add" className="btn btn-primary login_btn btn-block" onClick={handleSubmitClick} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddCloudAccount;

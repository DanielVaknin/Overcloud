import React, { useEffect, useState } from "react";
import "./Header.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Cascader } from "antd";

const Menu = (props) => {
  const history = useHistory();
  const [cloudAccount, setCloudAccount] = useState(JSON.parse(localStorage.getItem("cloudAccount")));
  const [isLoggedIn, setIsLoggedIn] = useState([]); // it was null at firstload
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (props) {
      setIsLoggedIn(props.connectedUser);
    }
    axios
      .get(`http://localhost:8080/api/cloud-accounts`)
      .then((res) => {
        console.log(res.data);
        setAccounts(res.data);
        let arr = res.data.map((item) => ({
          value: item.displayName,
          label: item.displayName,
        }));

        setOptions(arr);
      })
      .catch((e) => {
        //Alert error to the user
        console.log(e);
        setError(e.response.data.error);
        alert(error);
      });
  }, [props]);


  const onChange = (value) => {
    console.log(value[0]);
    let selectedName = value[0];
    let selectedAccount = accounts.find((item) => item.displayName == selectedName);

    //accounts.fi
    localStorage.setItem("cloudAccount", JSON.stringify(selectedAccount));
  };

  const Recommendations = () =>{
    let currentAccount = JSON.parse(localStorage.getItem("cloudAccount"));
    console.log(currentAccount)
    history.push(`/Recommendations/${currentAccount._id}`);
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Cascader options={options} onChange={onChange} defaultValue={[cloudAccount.displayName]} />,
      {isLoggedIn ? (
        <Nav className="mr-auto flex-column">
          <Nav.Link href="/AddCloudAccount">Add Cloud Account</Nav.Link>
          <Nav.Link href="/CloudAccounts">Cloud Accounts</Nav.Link>
          <Nav.Link onClick={Recommendations}>Recommendations</Nav.Link>
        </Nav>
      ) : (
        <Nav></Nav>
      )}
      {!isLoggedIn ? (
        <Nav className="mr-auto1 flex-column">
          <Nav.Link href="/Register">Register</Nav.Link>
          <Nav.Link href="/Loginform">Login</Nav.Link>
        </Nav>
      ) : (
        <Nav></Nav>
      )}
    </Navbar>
  );
};

export default Menu;

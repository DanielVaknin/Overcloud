import React, {useState} from "react";
import "./Register.css";
import axios from "axios";
import {useHistory} from "react-router-dom";

function Register(props) {
    const history = useHistory();

    const [details, setDetails] = useState({name: "", email: "", password: ""});
    const [user, setUser] = useState({name: "", email: "", password: ""});
    const [error, setError] = useState("");
    const [confirmPassword, setConfirmPassword] = useState({verify: ""})

    const handleSubmitClick = (e) => {
        e.preventDefault();
        if (details.password === confirmPassword.verify) {
            sendDetailsToServer();
        } else {
            alert('Passwords do not match')
            console.log("Passwords do not match")
        }
    }


    const sendDetailsToServer = async () => {
        console.log(details);
        await axios.post('http://localhost:8080/api/users/register', details)
            .then(response => {
                console.log(response)
                setUser({
                    name: response.data.name,
                    email: response.data.email,

                })
                history.push('/Loginform')
            }).catch(error => {
                if (error.response.status === 400) {
                    setError("error cannot register");
                    console.log("error register", error)
                }

            });
    };

    return (
        <form onSubmit={handleSubmitClick}>
            <title> Register Page </title>
            <link
                rel="stylesheet"
                href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
                integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
                crossOrigin="anonymous"
            />
            <link
                rel="stylesheet"
                href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
                integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
                crossOrigin="anonymous"
            />
            <link rel="stylesheet" type="text/css" href="styles.css"/>
            <div className="container">
                <div className="d-flex justify-content-center h-100">
                    <div className="card">
                        <div className="card-header">
                            <h3> Register </h3>{" "}
                        </div>
                        <div className="card-body">
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
									<span className="input-group-text">
										<i className="fas fa-user"> </i>
									</span>
                                </div>
                                <input type="text" className="form-control" placeholder="Name"
                                       onChange={e => {
                                           setDetails({...details, name: e.target.value})
                                       }} value={details.name}/>
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
									<span className="input-group-text">
										<i className="fas fa-envelope"> </i>
									</span>
                                </div>
                                <input type="" className="form-control" placeholder="Email"
                                       onChange={e => setDetails({...details, email: e.target.value})}
                                       value={details.email}/>
                            </div>

                            <div className="input-group form-group">
                                <div className="input-group-prepend">
									<span className="input-group-text">
										<i className="fas fa-key"> </i>
									</span>
                                </div>
                                <input type="password" className="form-control" placeholder="Password"
                                       onChange={e => setDetails({...details, password: e.target.value})}
                                       value={details.password}/>
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
									<span className="input-group-text">
										<i className="fas fa-key"> </i>
									</span>
                                </div>
                                <input type="password" className="form-control" placeholder="Verify password"
                                       onChange={e => setConfirmPassword({...confirmPassword, verify: e.target.value})}
                                       value={confirmPassword.verify}/>
                            </div>
                            <div className="form-group">
                                <input type="submit" value="Sign Up" className="btn float-right login_btn"
                                       style={{backgroundColor: "#85b1db"}} onClick={handleSubmitClick}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Register;

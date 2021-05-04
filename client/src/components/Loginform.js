import {useState} from 'react';
import './Loginform.css'
import {Link} from "react-router-dom";
import axios from 'axios';
import {useHistory} from "react-router-dom";

function Loginform(props) {
    const history = useHistory();
    const [details, setDetails] = useState({username: "", password: ""});

    const submitHandler = e => {
        e.preventDefault();
        login(details);
    }

    const [error, setError] = useState("");

    const login = (details) => {
        axios.post('http://localhost:8080/api/auth/login', details)
            .then(response => {
                const username = details['username'];
                props.setConnectedUser(details['username']);
                localStorage.setItem("user", details['username']);
                setTimeout(() => {
                    history.push('./Dashboard')
                }, 200);
            }).catch(error => {
            if (error.response.status === 400) {
                setError("User doesn't exist");
                alert(error)
            }
        });
    }

    return (
        <form className = "login" onSubmit={submitHandler}>
            <title>Login Page</title>

            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
                  integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
                  crossOrigin="anonymous"/>

            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
                  integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
                  crossOrigin="anonymous"/>

            <link rel="stylesheet" type="text/css" href="styles.css"/>

            <div className="container">
                <div className="d-flex justify-content-center h-100">
                    <div className="card">
                        <div className="card-header">
                            <h3>Sign In</h3>

                        </div>
                        <div className="card-body">

                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-user"/></span>
                                </div>
                                <input type="email" className="form-control" placeholder="Email"
                                       onChange={e => setDetails({...details, username: e.target.value})}
                                       value={details.username}/>

                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-key"/></span>
                                </div>
                                <input type="password" className="form-control" placeholder="Password"
                                       onChange={e => setDetails({...details, password: e.target.value})}
                                       value={details.password}/>
                            </div>

                            <div className="form-group">
                                <input type="submit" value="Login" className="btn float-right login_btn"
                                       style={{backgroundColor: "#85b1db"}}/>

                            </div>

                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center links">
                                Don't have an account?<Link to='/Register'>Sign Up</Link>
                            </div>
                            <div className="d-flex justify-content-center">
                                <a href="">Forgot your password?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Loginform
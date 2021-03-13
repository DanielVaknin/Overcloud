import { useState } from 'react';
import './Loginform.css'
import Register from './Register';
import { Link } from "react-router-dom";
import axios from 'axios';
//import history from '../History';
import { useHistory } from "react-router-dom";




function Loginform(props) {
	const history = useHistory();
	const [details, setDetails] = useState({ email: "", password: "" });

	const submitHandler = e => {
		e.preventDefault();
		Login(details);
	}


	const [user, setUser] = useState({ name: "", email: "" });
	const [error, setError] = useState("");

	const Login = async (details) => {
		console.log(details);
		await axios.post('http://localhost:8080/api/auth/login', details)
			.then(response => {
				console.log(response.data)
				let connectedUser = {name: response.data.name, email: response.data.email};
			    //setUser({name: response.data.name, email: response.data.email})
			    //setUser(connectedUser);
				console.log(connectedUser);
				props.setConnectedUser(connectedUser)
				localStorage.setItem("user", JSON.stringify(connectedUser));
				setTimeout(() => {
					history.push('./Dashboard')
				}, 200);
				

			}
			).catch(error => {
				if (error.response.status === 400){
				setError("user doesn't exist");
				alert(error)
				}
			});

	}
	return (
		<form onSubmit={submitHandler}>
			<title>Login Page</title>

			<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous" />

			<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous" />

			<link rel="stylesheet" type="text/css" href="styles.css" />

			<div className="container">
				<div className="d-flex justify-content-center h-100">
					<div className="card">
						<div className="card-header">
							<h3>Sign In</h3>

						</div>
						<div class="card-body">

							<div class="input-group form-group">
								<div class="input-group-prepend">
									<span class="input-group-text"><i class="fas fa-user"></i></span>
								</div>
								<input type="email" class="form-control" placeholder="Email" onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email} />

							</div>
							<div class="input-group form-group">
								<div class="input-group-prepend">
									<span class="input-group-text"><i class="fas fa-key"></i></span>
								</div>
								<input type="password" class="form-control" placeholder="Password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
							</div>

							<div class="form-group">
								<input type="submit" value="Login" class="btn float-right login_btn" />

							</div>

						</div>
						<div class="card-footer">
							<div class="d-flex justify-content-center links">
								Don't have an account?<Link to='/Register'>Sign Up</Link>
							</div>
							<div class="d-flex justify-content-center">
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
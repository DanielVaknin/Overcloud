import React, { useState } from "react";
import "./Register.css";
import axios from "axios";

function Register(props) {

	const [details, setDetails] = useState({ name:"" ,email:"", password:""});
	const [user,setUser] = useState({name:"", email:"", password:""});
	const [error, setError] = useState("");
	const [confirmPassword, setConfirmPassword] = useState({verify:""})
	

	const handleSubmitClick = (e) => {
		e.preventDefault();
		if (details.password === confirmPassword.verify) {
			sendDetailsToServer();
		} else {
			console.log("Passwords do not match")
		}
	}


	const sendDetailsToServer = async() => {
		console.log(details);
		await axios.post('http://localhost:8080/api/users/register', details)
				.then(response => {console.log(response)
					setUser({
					name: response.data.name,
					email: response.data.email,
			  
				  })}).catch(error => {
					setError("error cannot register");
					console.log("error register", error)
				  
				});
	};

	return (
		<form onSubmit = {handleSubmitClick}>
			<title> Register Page </title>
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
							<h3> Register </h3>{" "}
						</div>
						<div class="card-body">
							<div class="input-group form-group">
								<div class="input-group-prepend">
									<span class="input-group-text">
										<i class="fas fa-user"> </i>
									</span>
								</div>
								<input type="text" class="form-control" placeholder="user name" value={details.name} onChange={e=> {setDetails({...details, name: e.target.value}) }} value = {details.name} />
							</div>
							<div class="input-group form-group">
								<div class="input-group-prepend">
									<span class="input-group-text">
										<i class="fas fa-envelope"> </i>
									</span>
								</div>
								<input type="" class="form-control" placeholder="Email" value={details.email} onChange={e=>setDetails({...details, email: e.target.value})}value = {details.email} />
							</div>
							
							<div class="input-group form-group">
								<div class="input-group-prepend">
									<span class="input-group-text">
										<i class="fas fa-key"> </i>
									</span>
								</div>
								<input type="password" class="form-control" placeholder="Password" value={details.password} onChange={e=>setDetails({...details, password: e.target.value})}value = {details.password} />
							</div>
							<div class="input-group form-group">
								<div class="input-group-prepend">
									<span class="input-group-text">
										<i class="fas fa-key"> </i>
									</span>
								</div>
								<input type="password" class="form-control" placeholder="Verify password" value={confirmPassword} onChange={e=>setConfirmPassword({...confirmPassword, verify: e.target.value})}value = {confirmPassword.verify} />
							</div>
							<div class="form-group">
								<input type="submit" value="Sign Up" class="btn float-right login_btn" onClick={handleSubmitClick} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
}
export default Register;

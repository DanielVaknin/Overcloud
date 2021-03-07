import { useState } from 'react';
import './Loginform.css'
import Register from './Register';
import { Link } from "react-router-dom"; 
import axios from 'axios';




function Loginform() {

   const [details, setDetails] = useState({ email:"", password:""});

    const submitHandler = e=>{
        e.preventDefault();
        Login(details);
    }

	
	const [user,setUser] = useState({name:"", email:""});
	const [error, setError] = useState("");
  
	const Login = async(details) =>{
	  console.log(details);
	  await axios.post('http://localhost:8080/api/auth/login',details)
	  .then(response => setUser({
		email: response.details.email,
		password: response.details.password
  
	  })
	  ).catch(error => {
		setError("user doesn't exist");
	  
	});
	 
	}
	const Logout = ()=>{
	  setUser({email:"", password: ""});
	}
    return (
        <form onSubmit = {submitHandler}>
           <title>Login Page</title>
   
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"/>
    
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous"/>

	<link rel="stylesheet" type="text/css" href="styles.css"/>

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
						<input type="email" class="form-control" placeholder="username" onChange = {e=>setDetails({...details, email: e.target.value})}value = {details.email}/>
						
					</div>
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-key"></i></span>
						</div>
						<input type="password" class="form-control" placeholder="password" onChange = {e=>setDetails({...details, password: e.target.value})}value = {details.password}/>
					</div>
				
					<div class="form-group">
						<input type="submit" value="Login" class="btn float-right login_btn"/>
						    
					</div>
				
			</div>
			<div class="card-footer">
				<div class="d-flex justify-content-center links">
					Don't have an account?<Link to = '/Register'>Sign Up</Link>
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
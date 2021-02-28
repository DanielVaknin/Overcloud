import React from 'react'
import './Register.css'

function Register(){

    return(
       <form>
           <title>Register Page</title>
   
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"/>
    
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous"/>

	<link rel="stylesheet" type="text/css" href="styles.css"/>

<div className="container">
	<div className="d-flex justify-content-center h-100">
		<div className="card">
			<div className="card-header">
				<h3>Register</h3>
			
			</div>
			<div class="card-body">
			
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-user"></i></span>
						</div>
						<input type="text" class="form-control" placeholder="username" />
						
					</div>
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-envelope"></i></span>
						</div>
						<input type="text" class="form-control" placeholder="Email" />
					</div>
                    		<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-briefcase"></i></span>
						</div>
						<input type="text" class="form-control" placeholder="Organization" />
					</div>
                    		<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-key"></i></span>
						</div>
						<input type="text" class="form-control" placeholder="Password" />
					</div>
                    		<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-key"></i></span>
						</div>
						<input type="text" class="form-control" placeholder="Verify password" />
					</div>
        
					<div class="form-group">
						<input type="submit" value="Sign Up" class="btn float-right login_btn"/>
						    
					</div>
				
			</div>
			
		</div>
	</div>
</div>
        </form>
    );
}
export default Register

import React, { useEffect, useState } from 'react';
import './Header.css'
import { Link,useHistory } from 'react-router-dom';



const Header = (props) => {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState([]) // it was null at firstload 

  useEffect(() => {
    if (props) {
      setIsLoggedIn(props.connectedUser)
    }
  }, [props])

  const onLogout = (e) => {
    setIsLoggedIn(false);
    localStorage.removeItem('user')
    history.push('/loginform')
  }

  return (
    //<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" >
      <div className="Header">
        {
            !isLoggedIn ? <div className = "links">
                <Link to='/Register' className="register">Register</Link>
             
                <Link to='/Loginform' className="login">Login</Link>
              </div>
              : <ul>
                  <Link to='/' className="logout" onClick={onLogout}>Logout</Link>
              </ul>
          }
        <Link to='/'><img className="logo" src="images/Capture.PNG" alt="img"></img></Link>
        <div>
          {
            isLoggedIn ?
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to='/AddCloudAccount' className="add-cloud">Add Cloud Account</Link>
                </li>
                <li className="nav-item">
                  <Link to='/CloudAccounts' className="cloud-acount">Cloud Accounts</Link>
                </li>
                <li className="nav-item">
                  <Link to='/Recommendations' className="recommendations">Recommendations</Link>
                </li>
              </ul> : <div></div>
          }
          
        </div>
      </div>
  )
}

export default Header;
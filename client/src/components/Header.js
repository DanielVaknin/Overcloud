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
      <nav className="Header">
        <Link to='/' className="navbar-brand"><img className="logo" src="images/Capture.PNG" alt="img"></img>OverCloud</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          {
            isLoggedIn ?
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to='/addCloudAccount' className="nav-link">Add Cloud Account</Link>
                </li>
                <li className="nav-item">
                  <Link to='/cloudAccounts' className="nav-link">Cloud Accounts</Link>
                </li>
                <li className="nav-item">
                  <Link to='/recommendations' className="nav-link">Recommendations</Link>
                </li>
              </ul> : <div></div>
          }
          {
            !isLoggedIn ? <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to='/register' className="nav-link">Register</Link>
              </li>
              <li className="nav-item">
                <Link to='/loginform' className="nav-link">Login</Link>
              </li></ul>
              : <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to='/' className="nav-link" onClick={onLogout}>Logout</Link>
                </li>
              </ul>
          }
        </div>
      </nav>
   // </nav >
    // <div className="Header">
    //     <img className = "logo" src="images/Capture.PNG"></img>
    // </div>
  )
}

export default Header;
import React, {useEffect, useState} from 'react';
import './Header.css'
import {Link, useHistory} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

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
        localStorage.removeItem('cloudAccount')
        history.push('/Loginform')
    }

    const onAddCloudAccount = (e) => {
        localStorage.removeItem('cloudAccount')
    }


    return (
        //<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" >
        // <div className="Header">
        //   <Link to='/' ><img className="logo" src="images/Capture.PNG" alt="img"></img></Link>
        //   {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        //       <span className="navbar-toggler-icon" />
        //     </button> */}
        //   {
        //     isLoggedIn ?
        //       <div class="header-right">
        //         <p>
        //           <Link class="links" to='/AddCloudAccount' >Add Cloud Account</Link>
        //         </p>
        //         <p>
        //           <Link class="links" to='/CloudAccounts' >Cloud Accounts</Link>
        //         </p>
        //         <p>
        //           <Link class="links" to='/' onClick={onLogout}>Logout</Link>
        //         </p>
        //         {/* <li className="nav-item">
        //               <Link to='/Recommendations' className="nav-link">Recommendations</Link>
        //             </li> */}
        //       </div> : <div></div>
        //   }
        //   {
        //     !isLoggedIn ?
        //       <div class="header-right">
        //         <p>
        //           <Link class="links" to='/Register' className="nav-link">Register</Link>
        //         </p>
        //         <p>
        //           <Link class="links" to='/Loginform' className="nav-link">Login</Link>
        //         </p>
        //       </div> : <div></div>
        //   }
        // </div>
        // </nav >
        // <div className="Header">
        //     <img className = "logo" src="images/Capture.PNG"></img>
        // </div>

        <Navbar bg="dark" variant="dark">
            <Link to='/Dashboard'><img className="logo" src="images/Capture.PNG" alt="img"></img></Link>
            {
                isLoggedIn ?
                    <Nav className="mr-auto">
                        <Nav.Link href="/" onClick={onLogout} className = "logout-nav">Logout</Nav.Link>
                    </Nav> : <Nav></Nav>
            }
        </Navbar>
    )
}

export default Header;

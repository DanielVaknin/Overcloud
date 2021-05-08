import React, {useEffect, useState} from 'react';
import './Header.css'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Menu = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState([]) // it was null at firstload

    useEffect(() => {
        if (props) {
            setIsLoggedIn(props.connectedUser)
        }
    }, [props])



    return (
        <Navbar bg="dark" variant="dark">
            {
                isLoggedIn ?
                    <Nav className="mr-auto flex-column">
                        <Nav.Link href="/AddCloudAccount">Add Cloud Account</Nav.Link>
                        <Nav.Link href="/CloudAccounts">Cloud Accounts</Nav.Link>
                    </Nav> : <Nav></Nav>
            }
            {
                !isLoggedIn ?
                    <Nav className="mr-auto1 flex-column">
                        <Nav.Link href="/Register">Register</Nav.Link>
                        <Nav.Link href="/Loginform">Login</Nav.Link>
                    </Nav> : <Nav></Nav>
            }
        </Navbar>
    )
}

export default Menu;
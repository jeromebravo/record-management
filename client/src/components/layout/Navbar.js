import React from 'react';
import {Container, Navbar, Nav, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {logout} from '../../actions/auth';

const NavBar = ({logout}) => {
    return (
        <Navbar bg='primary' variant='dark' expand='lg'>
            <Container>
                <Navbar.Brand href='/dashboard'>RECORD MANAGEMENT</Navbar.Brand>
                <Nav>
                    <Button variant='danger' onClick={logout}>Logout</Button>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default connect(null, {logout})(NavBar);
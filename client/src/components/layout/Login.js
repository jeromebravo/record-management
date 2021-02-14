import React, {useState} from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {login} from '../../actions/auth';
import Alerts from './Alerts';
import {Redirect} from 'react-router-dom';

const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const {username, password} = formData;

    const handleChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        login(formData);
    }
    
    return !isAuthenticated ? (
        <Container className='mt-5'>
            <Form className='form mx-auto border border-info p-5' onSubmit={handleSubmit} autoComplete='off'>
                <Alerts />
                <h1 className='text-center'>LOGIN</h1>
                <Form.Group>
                    <Form.Label>
                        Username
                    </Form.Label>
                    <Form.Control type='text' name='username' placeholder='Username' value={username} onChange={handleChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control type='password' name='password' placeholder='Password' value={password} onChange={handleChange} />
                </Form.Group>

                <Button variant='primary' type='submit' block>LOGIN</Button>
            </Form>
        </Container>
    ) : <Redirect to='/dashboard' />;
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login);
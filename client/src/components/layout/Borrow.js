import React, {useState} from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import Spinner from './Spinner';
import {Redirect, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {createRecord} from '../../actions/record';
import Alerts from './Alerts';

const Borrow = ({auth, createRecord}) => {
    const history = useHistory();

    const [formData, setFormData] = useState({
        name: '',
        department: '',
        item: ''
    });

    const {name, department, item} = formData;

    const handleChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        createRecord(formData, history);
    }

    return !auth.loading ? (
        auth.isAuthenticated ? (
            <Container className='mt-5'>
                <Form className='form mx-auto border border-info p-5' onSubmit={handleSubmit} autoComplete='off'>
                    <Alerts />
                    <h1 className='text-center'>BORROW</h1>
                    <Form.Group>
                        <Form.Label>
                            Name
                        </Form.Label>
                        <Form.Control type='text' name='name' placeholder='Name' value={name} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            Department
                        </Form.Label>
                        <Form.Control type='text' name='department' placeholder='Department' value={department} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            Item
                        </Form.Label>
                        <Form.Control type='text' name='item' placeholder='Item' value={item} onChange={handleChange} />
                    </Form.Group>

                    <Button variant='primary' type='submit' block>SUBMIT</Button>
                </Form>
            </Container>
        ) : <Redirect to='/' />
    ) : <Spinner />;
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {createRecord})(Borrow);
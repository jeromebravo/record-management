import React, {useState} from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import Spinner from './Spinner';
import {Redirect, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import Alerts from './Alerts';
import {addItem} from '../../actions/item';

const Add = ({auth, addItem}) => {
    const history = useHistory();

    const [formData, setFormData] = useState({
        name: '',
        quantity: 1
    });

    const {name, quantity} = formData;

    const handleChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        addItem(formData, history);
    }

    return !auth.loading ? (
        auth.isAuthenticated ? (
            <Container className='mt-5'>
                <Form className='form mx-auto border border-info p-5' onSubmit={handleSubmit} autoComplete='off'>
                    <Alerts />
                    <h1 className='text-center'>ADD ITEM</h1>
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
                        <Form.Control type='number' min='1' name='quantity' placeholder='Quantity' value={quantity} onChange={handleChange} />
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

export default connect(mapStateToProps, {addItem})(Add);
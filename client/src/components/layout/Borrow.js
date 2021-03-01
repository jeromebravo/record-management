import React, {useState, useEffect} from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import Spinner from './Spinner';
import {Redirect, useHistory, useRouteMatch} from 'react-router-dom';
import {connect} from 'react-redux';
import {createRecord} from '../../actions/record';
import Alerts from './Alerts';
import {getOneItem} from '../../actions/item';

const Borrow = ({auth, createRecord, getOneItem, item}) => {
    const match = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        if(auth.isAuthenticated) {
            getOneItem(match.params.id, history);
        }
    }, [match.params.id, auth.isAuthenticated]);

    const [formData, setFormData] = useState({
        name: '',
        department: '',
        itemQuantity: 1,
        studentNumber: '',
        contact: ''
    });

    const {name, department, itemQuantity, studentNumber, contact} = formData;

    const handleChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        createRecord({...formData, itemId: item.item._id, itemName: item.item.name}, history);
    }

    return !auth.loading ? (
        auth.isAuthenticated ? (
            <Container className='mt-5'>
                <Form className='form mx-auto border border-info p-5' onSubmit={handleSubmit} autoComplete='off'>
                    <Alerts />
                    <h1 className='text-center'>BORROW</h1>
                    <p className='mt-3 bold text-center'>Item: {item.item.name}</p>
                    <p className='mt-3 bold text-center'>Stocks Quantity: {item.item.quantity}</p>
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
                            Quantity
                        </Form.Label>
                        <Form.Control type='number' min='1' name='itemQuantity' placeholder='Quantity' value={itemQuantity} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            Student Number
                        </Form.Label>
                        <Form.Control type='text' name='studentNumber' placeholder='Student Number' value={studentNumber} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            Contact Number
                        </Form.Label>
                        <Form.Control type='text' name='contact' placeholder='Contact Number' value={contact} onChange={handleChange} />
                    </Form.Group>

                    <Button variant='primary' type='submit' block>SUBMIT</Button>
                </Form>
            </Container>
        ) : <Redirect to='/' />
    ) : <Spinner />;
}

const mapStateToProps = state => ({
    auth: state.auth,
    item: state.item
});

export default connect(mapStateToProps, {createRecord, getOneItem})(Borrow);
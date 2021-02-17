import React, {useState, useEffect} from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import Spinner from './Spinner';
import {Redirect, useRouteMatch, useHistory} from 'react-router-dom';
import {getOneItem, updateItem} from '../../actions/item';
import Alerts from './Alerts';

const EditItem = ({auth, item, getOneItem, updateItem}) => {
    const match = useRouteMatch();
    const history = useHistory();
    
    useEffect(() => {
        if(auth.isAuthenticated) {
            getOneItem(match.params.id, history);
        }
    }, [match.params.id, auth.isAuthenticated]);

    useEffect(() => {
        if(!item.loading) {
            setFormData({
                ...formData,
                name: item.item.name,
                quantity: item.item.quantity
            });
        }
    }, [item.loading]);

    const [formData, setFormData] = useState({
        name: '',
        quantity: 0
    });

    let {name, quantity} = formData;

    const handleChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        updateItem(item.item._id, formData, history);
    }

    return !auth.loading ? (
        auth.isAuthenticated ? (
            !item.loading ? (
                <Container className='mt-5'>
                    <Form className='form mx-auto border border-warning p-5' onSubmit={handleSubmit} autoComplete='off'>
                        <Alerts />
                        <h1 className='text-center'>EDIT</h1>
                        <Form.Group>
                            <Form.Label>
                                Name
                            </Form.Label>
                            <Form.Control type='text' name='name' placeholder='Name' value={name} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>
                                Quantity
                            </Form.Label>
                            <Form.Control type='number' name='quantity' placeholder='Quantity' value={quantity} onChange={handleChange} />
                        </Form.Group>

                        <Button variant='warning' type='submit' block>UPDATE</Button>
                    </Form>
                </Container>
            ) : <Spinner />
        ) : <Redirect to='/' />
    ) : <Spinner />;
}

const mapStateToProps = state => ({
    auth: state.auth,
    item: state.item
});

export default connect(mapStateToProps, {getOneItem, updateItem})(EditItem);
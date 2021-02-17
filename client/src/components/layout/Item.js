import React, {Fragment, useEffect, useState} from 'react';
import {Container, Button, Row, Col, Form, Table} from 'react-bootstrap';
import Navbar from './Navbar';
import {connect} from 'react-redux';
import Spinner from './Spinner';
import {Redirect} from 'react-router-dom';
import Moment from 'react-moment';
import {getItems, deleteItem, searchItem} from '../../actions/item';
import Alerts from './Alerts';

const Item = ({auth, item, getItems, deleteItem, searchItem}) => {
    const [name, setName] = useState('');

    useEffect(() => {
        if(auth.isAuthenticated) {
            getItems();
        }
    }, [auth.isAuthenticated]);


    const handleChange = e => {
        setName(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        searchItem(name);
    }

    return !auth.loading ? (
        auth.isAuthenticated ? (
            <Fragment>
                <Navbar />
                <Container className='mt-5'>
                    <Row>
                        <Col md={3}>
                            <Form onSubmit={handleSubmit}>
                                <Alerts />
                                <Form.Group>
                                    <Form.Label>
                                        Search item name
                                    </Form.Label>
                                    <Form.Control name='search' type='text' onChange={handleChange} value={name} placeholder='Search item name' />
                                </Form.Group>

                                <Button variant='primary' type='submit' block>SEARCH</Button>
                            </Form>

                            <Button href='/add' className='my-5' variant='success' block>ADD ITEM</Button>
                        </Col>

                        <Col>
                            {!item.loading ? 
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Date Added</th>
                                            <th>Item Name</th>
                                            <th>Stock Quantity</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {item.items.map(i => (
                                            <tr key={i._id}>
                                                <td>
                                                    <Moment format='MMM DD, YYYY'>{i.date}</Moment>
                                                </td>
                                                <td>{i.name}</td>
                                                <td>{i.quantity}</td>
                                                <td>
                                                    <Button href={`/borrow/item/${i._id}`} variant='success' block>Borrow</Button>
                                                    <Button href={`/edit/item/${i._id}`} variant='warning' block>Edit</Button>
                                                    <Button variant='danger' block onClick={() => deleteItem(i._id)}>Delete</Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                : <Spinner />}
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        ) : <Redirect to='/' />
    ) : <Spinner />;
}

const mapStateToProps = state => ({
    auth: state.auth,
    item: state.item
});

export default connect(mapStateToProps, {getItems, deleteItem, searchItem})(Item);
import React, {Fragment, useEffect, useState} from 'react';
import {Container, Button, Row, Col, Form, Table} from 'react-bootstrap';
import Navbar from './Navbar';
import {connect} from 'react-redux';
import Spinner from './Spinner';
import {Redirect} from 'react-router-dom';
import {getRecords, deleteRecord, returnItem, selectStatus} from '../../actions/record';
import Moment from 'react-moment';

const Record = ({auth, getRecords, record, deleteRecord, returnItem, selectStatus}) => {
    useEffect(() => {
        if(auth.isAuthenticated) {
            getRecords();
        }
    }, [auth.isAuthenticated]);

    const [status, setStatus] = useState('All');

    const handleChange = e => {
        setStatus(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        selectStatus(status);
    }

    return !auth.loading ? (
        auth.isAuthenticated ? (
            <Fragment>
                <Navbar />
                <Container className='mt-5'>
                    <Row>
                        <Col md={3}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>
                                        Select status
                                    </Form.Label>
                                    <Form.Control name='search' as='select' onChange={handleChange}>
                                        <option value='All'>All</option>
                                        <option value='Borrowed'>Borrowed</option>
                                        <option value='Returned'>Returned</option>
                                    </Form.Control>
                                </Form.Group>

                                <Button variant='primary' type='submit' block>SEARCH</Button>
                            </Form>
                        </Col>

                        <Col>
                            {!record.loading ? 
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Date Borrowed</th>
                                        <th>Name</th>
                                        <th>Department</th>
                                        <th>Item</th>
                                        <th>Quantity</th>
                                        <th>Student Number</th>
                                        <th>Contact Number</th>
                                        <th>Status</th>
                                        <th>Date Returned</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {record.records.map(r => (
                                        <tr key={r._id}>
                                            <td>
                                                <Moment format='MMM DD, YYYY'>{r.dateBorrowed}</Moment>
                                            </td>
                                            <td>{r.name}</td>
                                            <td>{r.department}</td>
                                            <td>{r.itemName}</td>
                                            <td>{r.itemQuantity}</td>
                                            <td>{r.studentNumber}</td>
                                            <td>{r.contact}</td>
                                            <td>{r.status}</td>
                                            <td>
                                                {r.dateReturned !== null &&
                                                    <Moment format='MMM DD, YYYY'>{r.dateReturned}</Moment>
                                                }
                                            </td>
                                            <td>
                                                {r.status === 'Borrowed' && <Button variant='success' block onClick={() => returnItem(r._id)}>Return</Button>}
                                                {r.status === 'Borrowed' && <Button href={`/edit/record/${r._id}`} variant='warning' block>Edit</Button>}
                                                {r.status === 'Borrowed' && <Button variant='danger' block onClick={() => deleteRecord(r._id)}>Delete</Button>}
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
    record: state.record
});

export default connect(mapStateToProps, {getRecords, deleteRecord, returnItem, selectStatus})(Record);
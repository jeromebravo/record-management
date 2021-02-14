import React, {useState, useEffect} from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import Spinner from './Spinner';
import {Redirect, useRouteMatch, useHistory} from 'react-router-dom';
import {getOneRecord, updateRecord} from '../../actions/record';
import Alerts from './Alerts';

const Edit = ({auth, record, getOneRecord, updateRecord}) => {
    const match = useRouteMatch();
    const history = useHistory();
    
    useEffect(() => {
        if(auth.isAuthenticated) {
            getOneRecord(match.params.id, history);
        }
    }, [match.params.id, auth.isAuthenticated]);

    useEffect(() => {
        if(!record.loading) {
            setFormData({
                ...formData,
                name: record.record.name,
                department: record.record.department,
                item: record.record.item
            });
        }
    }, [record.loading]);

    const [formData, setFormData] = useState({
        name: '',
        department: '',
        item: '',
    });

    let {name, department, item} = formData;

    const handleChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        updateRecord(record.record._id, formData, history);
    }

    return !auth.loading ? (
        auth.isAuthenticated ? (
            !record.loading ? (
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

                        <Button variant='warning' type='submit' block>UPDATE</Button>
                    </Form>
                </Container>
            ) : <Spinner />
        ) : <Redirect to='/' />
    ) : <Spinner />;
}

const mapStateToProps = state => ({
    auth: state.auth,
    record: state.record
});

export default connect(mapStateToProps, {getOneRecord, updateRecord})(Edit);
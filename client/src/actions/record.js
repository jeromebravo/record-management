import {LOAD_RECORD, GET_RECORD, LOADED_RECORD, CREATE_RECORD, DELETE_RECORD, UPDATE_RECORD, GET_ONE_RECORD, RETURN_ITEM} from './types';
import axios from 'axios';
import config from './config';
import {addAlert, removeAlert} from './alert';

// get all records
export const getRecords = () => async dispatch => {
    try {
        dispatch({type: LOAD_RECORD});

        const res = await axios.get('/api/record');

        dispatch({
            type: GET_RECORD,
            payload: res.data
        });
    } catch(err) {
        dispatch({type: LOADED_RECORD});

        const error = err.response.data.msg;

        if(error) {
            dispatch(removeAlert());

            dispatch(addAlert(error));
        }

        console.error(err);
    }
}

// select status
export const selectStatus = status => async dispatch => {
    try {
        dispatch({type: LOAD_RECORD});

        let res;

        if(status === 'All') {
            res = await axios.get('/api/record');
        } else {
            res = await axios.post('/api/record/status', {status}, config);
        }

        dispatch({
            type: GET_RECORD,
            payload: res.data
        });
    } catch(err) {
        dispatch({type: LOADED_RECORD});

        const error = err.response.data.msg;

        if(error) {
            dispatch(removeAlert());

            dispatch(addAlert(error));
        }

        console.error(err);
    }
}

// create new record
export const createRecord = (formData, history) => async dispatch => {
    try {
        dispatch({type: LOAD_RECORD});

        const res = await axios.post('/api/record', formData, config);

        dispatch({
            type: CREATE_RECORD,
            payload: res.data
        });

        history.push('/dashboard');
    } catch(err) {
        dispatch({type: LOADED_RECORD});

        const errors = err.response.data.errors;

        if(errors) {
            // remove alert
            dispatch(removeAlert());

            // add each error
            errors.forEach(error => dispatch(addAlert(error.msg)));
        }

        console.error(err);
    }
}

// delete record
export const deleteRecord = id => async dispatch => {
    try {
        dispatch({type: LOAD_RECORD});

        await axios.delete(`/api/record/${id}`);

        dispatch({type: DELETE_RECORD, payload: id});
    } catch(err) {
        dispatch({type: LOADED_RECORD});

        const error = err.response.data.msg;

        if(error) {
            dispatch(removeAlert());

            dispatch(addAlert(error));
        }

        console.error(err);
    }
}

// get one record
export const getOneRecord = (id, history) => async dispatch => {
    try {
        dispatch({type: LOAD_RECORD});

        const res = await axios.get(`/api/record/${id}`);

        dispatch({
            type: GET_ONE_RECORD,
            payload: res.data
        });
    } catch(err) {
        dispatch({type: LOADED_RECORD});

        history.push('/dashboard');

        const error = err.response.data.msg;

        if(error) {
            dispatch(removeAlert());

            dispatch(addAlert(error));
        }

        console.error(err);
    }
}

// update record
export const updateRecord = (id, formData, history) => async dispatch => {
    try {
        dispatch({type: LOAD_RECORD});

        const res = await axios.put(`/api/record/edit/${id}`, formData, config);

        dispatch({
            type: UPDATE_RECORD,
            payload: res.data
        });

        history.push('/dashboard');
    } catch(err) {
        dispatch({type: LOADED_RECORD});

        const errors = err.response.data.errors;

        if(errors) {
            // remove alert
            dispatch(removeAlert());

            // add each error
            errors.forEach(error => dispatch(addAlert(error.msg)));
        }

        console.error(err);
    }
}

// return item
export const returnItem = id => async dispatch => {
    try {
        dispatch({type: LOAD_RECORD});

        const res = await axios.put(`/api/record/return/${id}`);

        dispatch({
            type: RETURN_ITEM,
            payload: res.data
        });
    } catch(err) {
        dispatch({type: LOADED_RECORD});

        const errors = err.response.data.errors;

        if(errors) {
            // remove alert
            dispatch(removeAlert());

            // add each error
            errors.forEach(error => dispatch(addAlert(error.msg)));
        }

        console.error(err);
    }
}
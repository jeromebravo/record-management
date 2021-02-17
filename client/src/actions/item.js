import axios from 'axios';
import {LOAD_ITEM, LOADED_ITEM, GET_ITEM, GET_ONE_ITEM, CREATE_ITEM, UPDATE_ITEM, DELETE_ITEM} from './types';
import {addAlert, removeAlert} from './alert';
import config from './config';

// get all items
export const getItems = () => async dispatch => {
    try {
        dispatch({type: LOAD_ITEM});

        const res = await axios.get('/api/item');

        dispatch({
            type: GET_ITEM,
            payload: res.data
        });
    } catch(err) {
        dispatch({type: LOADED_ITEM});

        const error = err.response.data.msg;

        if(error) {
            dispatch(removeAlert());

            dispatch(addAlert(error));
        }

        console.error(err);
    }
}


// add new item
export const addItem = (formData, history) => async dispatch => {
    try {
        dispatch({type: LOAD_ITEM});

        const res = await axios.post('/api/item', formData, config);

        dispatch({
            type: CREATE_ITEM,
            payload: res.data
        });

        history.push('/items');
    } catch(err) {
        dispatch({type: LOADED_ITEM});

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

// get one item
export const getOneItem = (id, history) => async dispatch => {
    try {
        dispatch({type: LOAD_ITEM});

        const res = await axios.get(`/api/item/${id}`);

        dispatch({
            type: GET_ONE_ITEM,
            payload: res.data
        });
    } catch(err) {
        dispatch({type: LOADED_ITEM});

        history.push('/items');

        const error = err.response.data.msg;

        if(error) {
            dispatch(removeAlert());

            dispatch(addAlert(error));
        }

        console.error(err);
    }
}

// update item
export const updateItem = (id, formData, history) => async dispatch => {
    try {
        dispatch({type: LOAD_ITEM});

        const res = await axios.put(`/api/item/${id}`, formData, config);

        dispatch({
            type: UPDATE_ITEM,
            payload: res.data
        });

        history.push('/items');
    } catch(err) {
        dispatch({type: LOADED_ITEM});

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

// delete item
export const deleteItem = id => async dispatch => {
    try {
        dispatch({type: LOAD_ITEM});

        await axios.delete(`/api/item/${id}`);

        dispatch({type: DELETE_ITEM, payload: id});
    } catch(err) {
        dispatch({type: LOADED_ITEM});

        const error = err.response.data.msg;

        if(error) {
            dispatch(removeAlert());

            dispatch(addAlert(error));
        }

        console.error(err);
    }
}

// search item
export const searchItem = name => async dispatch => {
    try {
        dispatch({type: LOAD_ITEM});

        const res = await axios.post('/api/item/search', {name}, config);

        dispatch({
            type: GET_ITEM,
            payload: res.data
        });
    } catch(err) {
        dispatch({type: LOADED_ITEM});

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

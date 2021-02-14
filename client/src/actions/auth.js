import axios from 'axios';
import {LOAD_USER, SET_USER, LOADED_USER, LOGOUT} from './types';
import config from './config';
import {addAlert, removeAlert} from './alert';
import setTokenHeader from '../utils/setTokenHeader';

// login
export const login = formData => async dispatch => {
    try {
        dispatch({type: LOAD_USER});

        const res = await axios.post('/api/auth', formData, config);

        dispatch({type: SET_USER});

        localStorage.setItem('token', res.data);

        setTokenHeader(res.data);
    } catch(err) {
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

// load user
export const loadUser = token => async dispatch => {
    try {
        dispatch({type: LOAD_USER});

        dispatch({type: SET_USER});

        setTokenHeader(token);
    } catch(err) {
        console.error(err);
        dispatch({type: LOADED_USER});
        dispatch(addAlert(err.response.data.msg));
        dispatch(logout());
    }
}

// logout
export const logout = () => dispatch => {
    // remove token in local storage
    localStorage.removeItem('token');

    // remove token in header
    setTokenHeader(false);

    dispatch({type: LOGOUT});
}
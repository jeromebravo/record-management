import {LOAD_USER, SET_USER, LOADED_USER, LOGOUT} from '../actions/types';

const initialState = {
    isAuthenticated: false,
    loading: true
};

const auth = (state = initialState, action) => {
    const {type} = action;

    switch(type) {
        case LOAD_USER:
            return {...state, loading: true};

        case SET_USER:
            return {...state, isAuthenticated: true, loading: false};

        case LOADED_USER:
            return {...state, loading: false};

        case LOGOUT:
            return {...state, isAuthenticated: false, loading: false};

        default:
            return state;
    }
}

export default auth;
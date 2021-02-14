import {LOAD_RECORD, GET_RECORD, CREATE_RECORD, UPDATE_RECORD, DELETE_RECORD, GET_ONE_RECORD, LOADED_RECORD, RETURN_ITEM} from '../actions/types';

const initialState = {
    records: [],
    record: {},
    loading: true
};

const record = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type) {
        case LOAD_RECORD:
            return {...state, loading: true};

        case GET_RECORD:
            return {...state, records: payload, loading: false};

        case CREATE_RECORD:
            return {...state, records: [payload, ...state.records], loading: false};

        case UPDATE_RECORD:
        case RETURN_ITEM:
            return {
                ...state,
                loading: false,
                records: state.records.map(record => record._id === payload._id ? payload : record)
            }

        case DELETE_RECORD:
            return {
                ...state,
                loading: false,
                records: state.records.filter(record => record._id !== payload)
            }

        case GET_ONE_RECORD:
            return {...state, record: payload, loading: false};

        case LOADED_RECORD:
            return {...state, loading: false};

        default:
            return state;
    }
}

export default record;
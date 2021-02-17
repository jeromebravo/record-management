import {LOAD_ITEM, LOADED_ITEM, GET_ITEM, GET_ONE_ITEM, CREATE_ITEM, UPDATE_ITEM, DELETE_ITEM} from '../actions/types';

const initialState = {
    items: [],
    item: {},
    loading: true
};

const item = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type) {
        case LOAD_ITEM:
            return {...state, loading: true};
        
        case LOADED_ITEM:
            return {...state, loading: false};

        case GET_ITEM:
            return {...state, items: payload, loading: false};

        case GET_ONE_ITEM:
            return {...state, item: payload, loading: false};

        case CREATE_ITEM:
            return {...state, items: [payload, ...state.items], loading: false};

        case UPDATE_ITEM:
            return {
                ...state,
                loading: false,
                items: state.items.map(item => item._id === payload._id ? payload : item)
            };

        case DELETE_ITEM:
            return {
                ...state,
                loading: false,
                items: state.items.filter(item => item._id !== payload)
            };

        default:
            return state;
    }
}

export default item;
import {combineReducers} from 'redux';
import alerts from './alert';
import auth from './auth';
import record from './record';
import item from './item';

const rootReducer = combineReducers({
    alerts,
    auth,
    record,
    item
});

export default rootReducer;
import {combineReducers} from 'redux';
import alerts from './alert';
import auth from './auth';
import record from './record';

const rootReducer = combineReducers({
    alerts,
    auth,
    record
});

export default rootReducer;
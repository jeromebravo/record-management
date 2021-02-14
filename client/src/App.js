import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import Routes from './components/routes/Routes';
import {loadUser, logout} from './actions/auth';

const App = () => {
    useEffect(() => {
        if(localStorage.token) {
            store.dispatch(loadUser(localStorage.token));
        } else {
            store.dispatch(logout());
        }
    }, [])

    return (
        <Provider store={store}>
            <Router>
                <Routes />
            </Router>
        </Provider>
    );
}

export default App;
import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Login from '../layout/Login';
import Dashboard from '../layout/Dashboard';
import Borrow from '../layout/Borrow';
import Edit from '../layout/Edit';

const Routes = () => {
    return (
        <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/borrow' component={Borrow} />
            <Route exact path='/edit/:id' component={Edit} />
            <Route exact path='*' render={() => <Redirect to='/' />} />
        </Switch>
    );
}

export default Routes;
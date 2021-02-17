import React from 'react';
import {Switch, Route, Redirect, useHistory} from 'react-router-dom';
import Login from '../layout/Login';
import Record from '../layout/Record';
import Borrow from '../layout/Borrow';
import Edit from '../layout/Edit';
import Item from '../layout/Item';
import Add from '../layout/Add';
import EditItem from '../layout/EditItem';
import {removeAlert} from '../../actions/alert';
import {connect} from 'react-redux';

const Routes = ({removeAlert}) => {
    const history = useHistory();

    history.listen(() => {
        removeAlert();
    });

    return (
        <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/items' component={Item} />
            <Route exact path='/records' component={Record} />
            <Route exact path='/add' component={Add} />
            <Route exact path='/borrow/item/:id' component={Borrow} />
            <Route exact path='/edit/item/:id' component={EditItem} />
            <Route exact path='/edit/record/:id' component={Edit} />
            <Route exact path='*' render={() => <Redirect to='/' />} />
        </Switch>
    );
}

export default connect(null, {removeAlert})(Routes);
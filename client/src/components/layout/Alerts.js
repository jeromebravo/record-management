import React from 'react';
import {connect} from 'react-redux';
import {Alert} from 'react-bootstrap';

const Alerts = ({alerts}) => alerts.map(alert => <Alert key={alert.id} variant='danger'>{alert.msg}</Alert>)

const mapStateToProps = state => ({
    alerts: state.alerts
});

export default connect(mapStateToProps)(Alerts);
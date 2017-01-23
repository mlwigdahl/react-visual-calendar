import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as app from '../../ducks/appDuck';
import {withRouter} from 'react-router';

import LoginForm from './LoginForm';

export class LoginPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.validToLogin = this.validToLogin.bind(this);
        this.submitRequest = this.submitRequest.bind(this);
    }

    submitRequest(event) {
        event.preventDefault();

        if (!this.validToLogin()) {
            // TODO show error message here...
            return;
        }

        this.props.actions.loginRequest(
            {
// TODO ...and more here as well
            }
        );
    }

    validToLogin() {
        // TODO better checks here...
        return true;
    }

    render() {
        return (
            <LoginForm onSubmit={this.onSubmit} validToLogin={this.validToLogin} user={this.props.user} />
        );
    }
}

LoginPage.propTypes = {
    actions: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return { user: { ...state.app.user } };
}

function mapDispatchToProps(dispatch) {
    return { 
        actions: bindActionCreators(app.creators, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
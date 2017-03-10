import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as app from '../../ducks/appDuck';
import {withRouter} from 'react-router';

import LoginForm from './LoginForm';

// TODO name state/props is messed up

export class LoginPage extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.validToLogin = this.validToLogin.bind(this);
        this.submitRequest = this.submitRequest.bind(this);
        this.loginFormChanged = this.loginFormChanged.bind(this);

        this.state = {
            username: this.props.name || '',
            password: undefined,
            error: this.props.error || '',
        };
    }

    submitRequest(event) {
        event.preventDefault();

        if (!this.validToLogin()) {
            this.setState({ error: 'Attempted to submit with incomplete credentials (internal error)'});
            return;
        }

        this.props.actions.loginRequest(this.state.username, this.state.password);
    }

    loginFormChanged(event) {
        const field = event.target.name;
        if (field === 'usr') {
            this.setState({ username: event.target.value });
        }
        else if (field === 'pwd') {
            this.setState({ password: event.target.value });
        }
    }

    validToLogin() {
        if (this.state.username !== undefined && this.state.password !== undefined) {
            return true;
        }
        return false;
    }

    render() {
        return (
            <LoginForm 
                onSubmit={this.submitRequest} 
                onChange={this.loginFormChanged} 
                validToLogin={this.validToLogin} 
                name={this.state.username} 
                error={this.state.error}
            />
        );
    }
}

LoginPage.propTypes = {
    actions: PropTypes.objectOf(React.PropTypes.func).isRequired,
    name: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    return { name: state.app.user.name || '', error: state.app.user.error || '' };
}

function mapDispatchToProps(dispatch) {
    return { 
        actions: bindActionCreators(app.creators, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
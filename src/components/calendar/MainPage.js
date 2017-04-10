import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory, withRouter } from 'react-router';

import CalendarPage from './CalendarPage';
import LoginPage from '../login/LoginPage';

// import { bindActionCreators } from 'redux';

export class MainPage extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
         if (this.props.user.id === undefined) {
            browserHistory.push(`/login`);
            return (<LoginPage />);
        }
    }

    render() {
        // need props for calendar
        if (this.props.user.id === undefined) {
            return (
                <div>
                    <span>Should not see...</span>
                </div>
            );
        }
        else {
            return (
                <div>
                    <CalendarPage 
                        currentDate={this.props.currentDate}
                        width={this.props.width}
                        height={this.props.height}
                    />
                </div>
            );
        }
    }
}

function mapStateToProps(state) {    
    const app = state.app;
    return { 
        user: app.user,
        width: app.width,
        height: app.height,
        currentDate: app.currentDate,
    };
}

MainPage.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        error: PropTypes.string,
    }),
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    currentDate: PropTypes.string.isRequired,
};

export default withRouter(connect(mapStateToProps)(MainPage));
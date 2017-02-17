import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory, withRouter } from 'react-router';

import Calendar from './Calendar';
import LoginPage from '../login/LoginPage';

//import InfiniteCalendar from 'react-infinite-calendar';
//import 'react-infinite-calendar/styles.css'; // Make sure to import the default stylesheet

// import { bindActionCreators } from 'redux';

export class MainPage extends React.Component {
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
                    <Calendar 
                        currentDate={this.props.currentDate}
                        width={this.props.width}
                        height={this.props.height}
                        calendar={this.props.calendar}
                        user={this.props.user.id}
                    />
                </div>
            );
        }
    }
}

function mapStateToProps(state) {    
    const app = state.app;
    return { 
        user: { ...app.user },
        width: app.width,
        height: app.height,
        currentDate: app.currentDate,
        calendar: { ...state.calendar }
    };
}

MainPage.propTypes = {
    user: PropTypes.object,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    currentDate: PropTypes.string.isRequired,
    calendar: PropTypes.object
};

export default withRouter(connect(mapStateToProps)(MainPage));
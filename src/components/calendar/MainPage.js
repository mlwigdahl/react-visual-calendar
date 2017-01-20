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
        return (
            <div>
                <Calendar 
                    currentDate={this.props.currentDate}
                    width={this.props.width}
                    height={this.props.height}
                    calendar={this.props.calendar}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {    
    const app = state.app;
    const cal = state.calendars.find(cal => cal.id == state.app.activeCalId);
    return { 
        user: {...app.user},
        width: app.width,
        height: app.height,
        currentDate: app.currentDate,
        calId: app.activeCalId,
        calendar: cal !== undefined ? {...cal} : {},
    };
}

MainPage.propTypes = {
    user: PropTypes.object,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    currentDate: PropTypes.string.isRequired,
    calId: PropTypes.number,
    calendar: PropTypes.object
};

export default withRouter(connect(mapStateToProps)(MainPage));
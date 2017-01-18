import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { /*browserHistory, */withRouter } from 'react-router';
import Calendar from './Calendar';
//import LogonPage from '../logon/LogonPage';

//import InfiniteCalendar from 'react-infinite-calendar';
//import 'react-infinite-calendar/styles.css'; // Make sure to import the default stylesheet

// import { bindActionCreators } from 'redux';

export class MainPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
/*        if (this.props.id === undefined) {
            browserHistory.push(`/logon`);
            return (<LogonPage />);
        } */ // TODO logon
        // need props for calendar
        return (
            <div>
                <Calendar 
                    id={this.props.id}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    
    const cal = state.calendar;

    return { 
        id: cal.id,
    };
}

MainPage.propTypes = {
    id: PropTypes.string,
};

export default withRouter(connect(mapStateToProps)(MainPage));
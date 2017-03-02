import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { withRouter } from 'react-router';

import * as calendar from '../../ducks/calendarDuck';
import Week from './Week';

export class Calendar extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            currentDate: moment().format("YYYYMMDD"),
        };

        this.onScroll = this.onScroll.bind(this);
    }

    renderDays() {
        // comments preserved for later API implementation...
        // start with the current date.  Go back two weeks and forward three weeks, then pull in the full week for each of those points.  Can't be earlier than min or later than max
        // may involve an API call as we'll be retrieving calendar data.  Pass the current date and allow it to set application state to the appropriate window, loading data as necessary.

        if (this.props.calendar === undefined) {
            return;
        }

        let first = moment(this.props.calendar.minDate);
        let last  = moment(this.props.calendar.maxDate);

        let days = [];
        let week = [];
        let startOfWeek;

        while (!first.isAfter(last)) {
            week.length = 0;
            startOfWeek = first.clone().startOf('week');

            while (first.clone().startOf('week').isSame(startOfWeek)) {
                week.push(first.clone());
                first.add(1, 'day');
            }

            const key = startOfWeek.format("wwYYYY");
            days.push(
                <Week 
                    key={key} 
                    user={this.props.user} 
                    week={[...week]} 
                    curDate={this.state.currentDate} 
                    dates={this.props.dates}
                    events={this.props.events} // TODO probably need some work here to filter this data as it's passed down
                />);
        }

        return days;
    }

    onScroll(/*event*/) {
        // TODO if we're at the end of our loaded data, we'll need to pull some more in.
        return;
    }

    // TODO not sure if this setup is optimal for scrolling / display
    render() {
        return (
            <div>
                <h1>Prototype Visual Calendar</h1>
                <div style={{overflowY: 'scroll', maxHeight: this.props.height}} onScroll={this.onScroll}>
                    <div className="calendar-class">
                        {this.renderDays()}
                    </div>
                </div>
            </div>
        );
    }
}

Calendar.propTypes = {
    user: PropTypes.number.isRequired,
    currentDate: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    calendar: PropTypes.object.isRequired,
    dates: PropTypes.object.isRequired,
    events: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
    return {
        dates: { ...state.dates },
        events: { ...state.events }
    };
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            clickDay: calendar.creators.clickDay
        }, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Calendar));
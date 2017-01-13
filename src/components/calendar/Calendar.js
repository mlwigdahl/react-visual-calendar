import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';
import moment from 'moment';

import * as calendar from '../../ducks/calendarDuck';
import Week from './Week';

export class Calendar extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            currentDate: moment().format("YYYYMMDD"),
        };

        this.onDayClick = this.onDayClick.bind(this);
    }

    visibleDays(minDate, maxDate, currentDate) {
        // start with the current date.  Go back two weeks and forward three weeks, then pull in the full week for each of those points.  Can't be earlier than min or later than max

        let first = moment(currentDate).subtract(2, 'weeks').startOf('week');
        
        if (first.isBefore(minDate)) { // TODO load some more data?
            first = moment(minDate);
        }

        let last = moment(currentDate).add(3, 'weeks').endOf('week');

        if (last.isAfter(maxDate)) { // TODO load some more data?
            last = moment(maxDate);
        }

        let days = [];
        let week = [];
        let startOfWeek;

        while (!first.isAfter(last)) {
            week.length = 0;
            startOfWeek = first.clone();

            while (first.clone().startOf('week').isSame(startOfWeek)) {
                week.push(first.clone());
                first.add(1, 'day');
            }

            const key = startOfWeek.format("ww");
            days.push(<Week key={key} id={key} week={[...week]} onClick={this.onDayClick}/>);
        }

        return days;
    }

    onDayClick(event) {
        debugger;
        return;
    }

    render() {
        return (
            <div>
                <h1>Prototype Visual Calendar</h1>
                <div>
                    {this.visibleDays(this.props.minDate, this.props.maxDate, this.props.currentDate)}
                </div>
            </div>
        );
    }
}

Calendar.propTypes = {
    id: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    minDate: PropTypes.string.isRequired,
    maxDate: PropTypes.string.isRequired,
    afterSelect: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    const cal = state.calendar;

    // TODO need id here?  shouldn't -- it's passed in
    return { 
        width: cal.width || 600,
        height: cal.height || 400,
        minDate: cal.minDate || moment().subtract(2, 'months').format("YYYYMMDD"),
        maxDate: cal.maxDate || moment().add(2, 'months').format("YYYYMMDD"),
    };
}

export default connect(mapStateToProps)(Calendar);
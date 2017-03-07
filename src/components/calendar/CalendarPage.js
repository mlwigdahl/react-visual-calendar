import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import moment from 'moment';

import CalendarBody from './CalendarBody';

import { selectors as calSelectors } from '../../ducks/calendarDuck';
import { creators as dateCreators } from '../../ducks/dateDuck';

export class CalendarPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.onScroll = this.onScroll.bind(this);
    }

/*
    componentDidMount() {
        debugger;
        this.refs.messages.scrollTop = this.refs.messages.scrollHeight / 2;
    }
*/ // TODO START HERE probably need to make CalendarBody a class and use a ref here.

    onScroll(event) {
   
        if (event.target.scrollTop < event.target.scrollHeight / 6) {
            let min = moment(this.props.minDate).add(-4, 'weeks');
            this.props.actions.loadDateRangeRequest(min.format('YYYYMMDD'), this.props.minDate);
        }
        else if (event.target.scrollTop > event.target.scrollHeight * 5 / 6) {
            let max = moment(this.props.maxDate).add(4, 'weeks');
            this.props.actions.loadDateRangeRequest(this.props.maxDate, max.format('YYYYMMDD'));
        }

        return;
    }

    // TODO not sure if this setup is optimal for scrolling / display
    render() {
        return (
            <div>
                <h1>Prototype Visual Calendar</h1>
                <CalendarBody
                    onScroll={this.onScroll}
                    height={this.props.height}
                    dates={this.props.dates}
                    events={this.props.events}
                    weeks={this.props.weeks}
                    currentDate={this.props.currentDate}
                />
            </div>
        );
    }
}

CalendarPage.propTypes = {
    currentDate: PropTypes.string.isRequired,
    minDate: PropTypes.string.isRequired,
    maxDate: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    dates: PropTypes.object.isRequired,
    events: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    weeks: PropTypes.array.isRequired
};

function makeWeeks({minDate, maxDate}) {
    const weeks = [];

    let first = moment(minDate).startOf('week');
    let last  = moment(maxDate).endOf('week');

    while (first.isBefore(last)) {
        weeks.push(first.clone());
        first.add(7, "days");
    }

    return weeks;
}

function mapStateToProps(state) {
    return {
        currentDate: state.app.currentDate,
        minDate: state.calendar.minDate,
        maxDate: state.calendar.maxDate,
        dates: { ...state.dates },
        events: { ...state.events },
        weeks: makeWeeks(calSelectors.getRange(state)),
    };
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            loadDateRangeRequest: dateCreators.loadDateRangeRequest,
        }, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CalendarPage));
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import moment from 'moment';

import CalendarBody from './CalendarBody';

import * as calendar from '../../ducks/calendarDuck';

export class CalendarPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.onScroll = this.onScroll.bind(this);
    }

    onScroll(event) {
        // TODO if we're at the end of our loaded data, we'll need to pull some more in.
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
                    user={this.props.user}
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
    user: PropTypes.number.isRequired,
    currentDate: PropTypes.string.isRequired,
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
        dates: { ...state.dates },
        events: { ...state.events },
        weeks: makeWeeks(calendar.selectors.getRange(state)),
    };
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            clickDay: calendar.creators.clickDay
        }, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CalendarPage));
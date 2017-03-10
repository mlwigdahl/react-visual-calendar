import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import moment from 'moment';

import CalendarBody from './CalendarBody';

import { creators as dateCreators } from '../../ducks/dateDuck';

export class CalendarPage extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.onScroll = this.onScroll.bind(this);

        const curDate = this.props.currentDate;
        const top = calcWindow(curDate, 'top');
        const bottom = calcWindow(curDate, 'bottom');

        this.state = {
            selectedDate: curDate,
            windowTop: top,
            windowBottom: bottom,
            weeks: updateWeeks(top, bottom, []),
        };
    }

    onScroll(event) {
   
        if (event.target.scrollTop === 0) {
            const newTop = this.state.windowTop.clone().add(-5, 'weeks');
            const newBottom = this.state.windowBottom.clone().add(-5, 'weeks');

            if (newTop.isBefore(this.props.minDate)) {
                this.props.actions.loadDateRangeRequest(newTop.format('YYYYMMDD'), this.props.minDate);    
            }

            const weeks = updateWeeks(newTop, newBottom, this.state.weeks);
            this.setState({ windowTop: newTop, windowBottom: newBottom, weeks });
            event.target.scrollTop = event.target.scrollTop + 1; // just a tweak to avoid getting stuck at the top
        }
        else if (event.target.scrollTop + event.target.clientHeight >= event.target.scrollHeight) {
            const newTop = this.state.windowTop.clone().add(5, 'weeks');
            const newBottom = this.state.windowBottom.clone().add(5, 'weeks');

            if (newBottom.isAfter(this.props.maxDate)) {
                this.props.actions.loadDateRangeRequest(this.props.maxDate, newBottom.format('YYYYMMDD'));
            }

            const weeks = updateWeeks(newTop, newBottom, this.state.weeks);
            this.setState({ windowTop: newTop, windowBottom: newBottom, weeks });
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
                    weeks={this.state.weeks}
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
    dates: PropTypes.objectOf(
        PropTypes.shape({
            events: PropTypes.arrayOf(PropTypes.number)
        })
    ).isRequired,
    events: PropTypes.objectOf(
        PropTypes.shape({
            icon: PropTypes.string,
            label: PropTypes.string,
            startTime: PropTypes.string,
            endDate: PropTypes.string,
        })
    ).isRequired,
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
};

function updateWeeks(top, bottom, weeks) {

    let first = top.clone();
    const last = bottom;
    const weeksNew = [];

    while (first.isBefore(last)) {
        const present = weeks.find(val => val.isSame(first, 'day'));
        if (present !== undefined) {
            weeksNew.push(present);
        }
        else {
            weeksNew.push(first.clone());
        }
        first.add(7, "days");
    }

    return weeksNew;
}

function calcWindow(date, dir) {
    let ret = undefined;

    if (dir === 'top') {
        ret = moment(date, "YYYYMMDD").startOf('month').add(-1, 'month').startOf('week');
    }
    else if (dir === 'bottom') {
        ret = moment(date, "YYYYMMDD").endOf('month').add(1, 'month').endOf('week');
    }

    return ret;
}



function mapStateToProps(state) {
    return {
        currentDate: state.app.currentDate,
        minDate: state.calendar.minDate,
        maxDate: state.calendar.maxDate,
        dates: state.dates,
        events: state.events,
    };
}

// TODO START HERE -- 
//  X 1. start with selectedDate (which should be app.currentDate to start with), 
//      set window state to -1 month and +1 month (full months + rest of week)
//  X 2. when scrolled to top or bottom, set window another month in the appropriate direction (+ rest of week)
//  X 3. also shift the other side of the window, preserving a fixed width
//  X 4. if doing so leads to a window that's out of range, fire off an async update 
//      to load the dates corresponding to the overlap
//  5. update app.scrollPos according to the window shift
//  X 6. update scroll bar position back to center (or whatever is needed to keep the window stable) (?)
//  7. implement shouldComponentUpdate on this and the InitialScroll wrapper to prevent scroll bounce

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            loadDateRangeRequest: dateCreators.loadDateRangeRequest,
        }, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CalendarPage));
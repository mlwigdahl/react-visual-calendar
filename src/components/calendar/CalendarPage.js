import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import moment from 'moment';

import CalendarBody from './CalendarBody';

import { creators as dateCreators } from '../../ducks/dateDuck';
import { creators as appCreators } from '../../ducks/appDuck';

export class CalendarPage extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.onScroll = this.onScroll.bind(this);
        this.saveScroll = this.saveScroll.bind(this);

        const curDate = this.props.currentDate;
        let top = undefined;
        let bottom = undefined;

        if (this.props.windowRange.top !== undefined &&
            this.props.windowRange.bottom !== undefined) {
            top = this.props.windowRange.top;
            bottom = this.props.windowRange.bottom;
        }
        else {
            top = calcWindow(curDate, 'top');
            bottom = calcWindow(curDate, 'bottom');
        }
 
        this.state = {
            selectedDate: curDate,
            windowTop: top,
            windowBottom: bottom,
            weeks: updateWeeks(top, bottom, []),
        };
    }

    componentWillUnmount() {
        this.props.actions.saveWindowRange(this.state.windowTop, this.state.windowBottom);
    }

    saveScroll(scrollPos) {
        this.props.actions.saveScroll(scrollPos);
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
                    scrollPos={this.props.scrollPos}
                    saveScroll={this.saveScroll}
                />
            </div>
        );
    }
}

CalendarPage.propTypes = {
    currentDate: PropTypes.string.isRequired,
    windowRange: PropTypes.object.isRequired,
    minDate: PropTypes.string.isRequired,
    maxDate: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    scrollPos: PropTypes.number,
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
        windowRange: state.app.windowRange,
        minDate: state.calendar.minDate,
        maxDate: state.calendar.maxDate,
        dates: state.dates,
        events: state.events,
        scrollPos: state.app.scrollPos,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            loadDateRangeRequest: dateCreators.loadDateRangeRequest,
            saveScroll: appCreators.saveScroll,
            saveWindowRange: appCreators.saveWindowRange,
        }, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CalendarPage));
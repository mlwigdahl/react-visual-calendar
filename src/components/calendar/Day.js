import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import moment from 'moment';

// TODO -- fix rendering layout

function renderMore(length) {
    if (length > 1) {
        return (<span className="date-label">{`(more)`}</span>);
    }
}

function renderEvents(events) {
    const event = events[Object.keys(events)
        .sort((a, b) => a - b)
        .find(val => val !== undefined ? true : false)];

    if (event !== undefined) {
        return (<div>
                <span className="date-label">{`${event.label}`}</span>
                <br/>
                <span className="date-start">{`${event.startTime} - ${event.endTime}`}</span>
                <br/>
                {renderMore(Object.keys(events).length)}
            </div>);
    }
}

function dayClass(day, curDate, styleObj) {
    const date = moment(day, 'MMM DD').format("MMDD");
    const now = moment(curDate, 'YYYYMMDD').format("MMDD");

    if (date === now) {
        return `day cur-day`;
    }

    return `day ${styleObj.className}`;
}

function Day({date, curDate, events, styleObj}) {

    const day = date.day;

    function onClick() {
        const date = moment(day, 'MMM DD');
        const now = moment(curDate, 'YYYYMMDD');
        const year = now.year() - ((now.month() < date.month()) ? 1 : 0);
        
        browserHistory.push(`/day/${moment({ year, month: date.month(), day: date.date() }).format('YYYYMMDD')}`);
    }

    return (
        <div className={dayClass(day, curDate, styleObj)} onClick={onClick}>
            <span className="date-day">{date.day}</span>
            <br/>
            {renderEvents(events)}
        </div>
    );
}

Day.propTypes = {
    curDate: PropTypes.string.isRequired,
    styleObj: PropTypes.object.isRequired,
    date: PropTypes.shape({
        events: PropTypes.arrayOf(PropTypes.number)
    }).isRequired,
    events: PropTypes.objectOf(
        PropTypes.shape({
            icon: PropTypes.string,
            label: PropTypes.string,
            startTime: PropTypes.string,
            endDate: PropTypes.string,
        })
    ).isRequired,
};

export default Day;
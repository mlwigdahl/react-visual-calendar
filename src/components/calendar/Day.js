import React from 'react';
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
        .sort((a, b) => a-b)
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

function dayClass(day, curDate) {
    const date = moment(day, 'MMM DD').format("MMDD");
    const now = moment(curDate, 'YYYYMMDD').format("MMDD");

    if (date == now) {
        return "day cur-day";
    }

    return "day";
}

function Day({user, date, curDate, events}) {

    const day = date.day;

    function onClick() {
        const date = moment(day, 'MMM DD');
        const now = moment(curDate, 'YYYYMMDD');
        const year = now.year() - ((now.month() < date.month()) ? 1 : 0);
        
        browserHistory.push(`/day/${moment({ year, month: date.month(), day: date.date() }).format('YYYYMMDD')}`);
    }

    return (
        <div className={dayClass(day, curDate)} onClick={onClick}>
            <span className="date-day">{date.day}</span>
            <br/>
            {renderEvents(events)}
        </div>
    );
}

Day.propTypes = {
    user: React.PropTypes.number.isRequired,
    date: React.PropTypes.object.isRequired,
    curDate: React.PropTypes.string.isRequired,
    events: React.PropTypes.object.isRequired,
};

export default Day;
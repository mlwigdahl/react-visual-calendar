import React from 'react';
import { browserHistory } from 'react-router';
import moment from 'moment';

// TODO -- fix rendering layout
// TODO -- deal with click now that we've extended the text

function renderEvents(dates) {
    return dates.map(date => date.events.map(
        (event, index) => {
            return (<div key={index}>
                <span className="date-label">{`${event.label}`}</span>
                <br/>
                <span className="date-start">{`${event.startTime}`}</span>
                <br/>
                <span className="date-end">{`${event.endTime}`}</span>
            </div>);
        }
    ));
}

const Day = ({date, curDate, events}) => {

    const day = date.day;

    function onClick() {
        const date = moment(day, 'MMM DD');
        const now = moment(curDate, 'YYYYMMDD');
        const year = now.year() - ((now.month() < date.month()) ? 1 : 0);
        
        browserHistory.push(`/day/${moment({ year, month: date.month(), day: date.date() }).format('YYYYMMDD')}`);
    }

    return (
        <div className="day" onClick={onClick}>
            <span className="date-day">{date.day}</span>
            <br/>
            {renderEvents(events)}
        </div>
    );
};

Day.propTypes = {
    date: React.PropTypes.object.isRequired,
    curDate: React.PropTypes.string.isRequired,
    events: React.PropTypes.array.isRequired,
};

export default Day;
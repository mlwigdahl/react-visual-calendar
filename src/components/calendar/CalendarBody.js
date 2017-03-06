import React from 'react';
import moment from 'moment';

import Week from './Week';

function renderDays(user, calendar, dates, events) {

    const currentDate = moment().format("YYYYMMDD");

    if (calendar === undefined) {
        return;
    }

    let first = moment(calendar.minDate);
    let last  = moment(calendar.maxDate);

    let weeks = [];
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
        weeks.push(
            <Week 
                key={key} 
                user={user} 
                week={[...week]} 
                curDate={currentDate} 
                dates={dates}
                events={events} // TODO probably need some work here to filter this data as it's passed down
            />);
    }

    return weeks;
}

// TODO interpose an autoscroll component here?
function CalendarBody({onScroll, height, user, calendar, dates, events}) {
    return (
        <div style={{overflowY: 'scroll', maxHeight: height}} onScroll={onScroll}>
            <div className="calendar-class">
                {renderDays(user, calendar, dates, events)}
            </div>
        </div>
    );
}

CalendarBody.propTypes = {
    onScroll: React.PropTypes.func.isRequired,
    height: React.PropTypes.number.isRequired,
    user: React.PropTypes.number.isRequired,
    calendar: React.PropTypes.object.isRequired,
    dates: React.PropTypes.object.isRequired,
    events: React.PropTypes.object.isRequired,
};

export default CalendarBody;
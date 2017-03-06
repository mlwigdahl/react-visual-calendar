import React from 'react';

import Day from './Day';

function renderDays(user, curDate, dates, events, weekStart) {
    const days = [];

    for(let i = 0; i < 7; i++) {
        const key = weekStart.format('YYYYMMDD');

        days.push(
            <Day 
                key={key}
                user={user}
                date={{ day: weekStart.format('MMM DD') }}
                curDate={curDate}
                events={findEvents(dates, events, key)}
            />
        );
        weekStart.add(1, 'day');
    }

    return days;
}

function findEvents(dates, events, date) {
    const targetDate = dates[date];

    return targetDate !== undefined ? 
        targetDate.events
            .reduce((acc, event) => { acc[event] = events[event]; return acc; }, {}) :
        {};
}

function Week({user, curDate, dates, events, weekStart}) {
    return (
        <div className="week">
            {renderDays(user, curDate, dates, events, weekStart)}
        </div>
    );
}

Week.propTypes = {
    user: React.PropTypes.number.isRequired,
    dates: React.PropTypes.object.isRequired,
    events: React.PropTypes.object.isRequired,
    curDate: React.PropTypes.string.isRequired,
    weekStart: React.PropTypes.object.isRequired,
};

export default Week;
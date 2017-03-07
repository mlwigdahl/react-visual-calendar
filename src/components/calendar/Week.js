import React from 'react';

import Day from './Day';

function monthStyle(date) {
    return ({ className: `month-${date.format('MMM')}`.toLowerCase() });
}

function renderDays(curDate, dates, events, weekStart) {
    const days = [];

    for(let i = 0; i < 7; i++) {
        const key = weekStart.format('YYYYMMDD');

        days.push(
            <Day 
                styleObj={monthStyle(weekStart)}
                key={key}
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

function Week({curDate, dates, events, weekStart}) {
    return (
        <div className="week">
            {renderDays(curDate, dates, events, weekStart)}
        </div>
    );
}

Week.propTypes = {
    dates: React.PropTypes.object.isRequired,
    events: React.PropTypes.object.isRequired,
    curDate: React.PropTypes.string.isRequired,
    weekStart: React.PropTypes.object.isRequired,
};

export default Week;
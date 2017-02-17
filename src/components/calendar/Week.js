import React from 'react';
import Day from './Day';

function findEvents(dates, events, date) {
    const targetDate = dates[Object.keys(dates)
        .find(key => dates[key].date == date)];

    return targetDate !== undefined ? 
        targetDate.events
            .reduce((acc, event) => { acc[event] = events[event]; return acc; }, {}) :
        {};
}

function Week({user, week, curDate, dates, events}) {
    return (
        <div className="week">
            {week.map(obj => {
                const key = obj.format('YYYYMMDD');
                return (
                    <Day 
                        key={key} 
                        user={user}
                        date={{ day: obj.format("MMM DD") }} 
                        curDate={curDate} 
                        events={findEvents(dates, events, key)}
                    />);
            })}
        </div>
    );
}

Week.propTypes = {
    user: React.PropTypes.number.isRequired,
    week: React.PropTypes.array.isRequired,
    dates: React.PropTypes.object.isRequired,
    events: React.PropTypes.object.isRequired,
    curDate: React.PropTypes.string.isRequired,
};

export default Week;
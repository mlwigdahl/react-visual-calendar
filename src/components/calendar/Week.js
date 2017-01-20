import React from 'react';
import Day from './Day';

function findEvents(calendar, date) {
    return calendar.dateInfo.filter(info => info.date == date);
}

const Week = ({week, curDate, calendar}) => {
    return (
        <div className="week">
            {week.map(obj => {
                const key = obj.format('YYYYMMDD');
                return (<Day key={key} date={{ day: obj.format("MMM DD") }} curDate={curDate} events={findEvents(calendar, key)}/>);
            })}
        </div>
    );
};

Week.propTypes = {
    week: React.PropTypes.array.isRequired,
    calendar: React.PropTypes.object.isRequired,
    curDate: React.PropTypes.string.isRequired,
};

export default Week;
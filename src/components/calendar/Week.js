import React from 'react';
import Day from './Day';

function findEvents(calendar, date) {
    return calendar.dateInfo.filter(info => info.date == date);
}

const Week = ({week, onClick, calendar}) => {
    return (
        <div className="week">
            {week.map(obj => {
                const key = obj.format('YYYYMMDD');
                return (<Day key={key} date={{ day: obj.format("MMM DD") }} onClick={onClick} events={findEvents(calendar, key)}/>);
            })}
        </div>
    );
};

Week.propTypes = {
    week: React.PropTypes.array.isRequired,
    onClick: React.PropTypes.func.isRequired,
    calendar: React.PropTypes.object.isRequired,
};

export default Week;
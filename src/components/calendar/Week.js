import React from 'react';
import Day from './Day';

const Week = ({week, onClick, calendar}) => {
    return (
        <div className="week">
            {week.map(obj => {
                const key = obj.format('YYYYMMDD');
                return (<Day key={key} date={{ day: obj.format("MMM DD") }} onClick={onClick} calendar={calendar}/>);
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
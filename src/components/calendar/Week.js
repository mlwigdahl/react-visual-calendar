import React from 'react';
import Day from './Day';

const Week = ({week, onClick}) => {
    return (
        <div className="week">
            {week.map(obj => {
                const key = obj.format('YYYYMMDD');
                return (<Day key={key} date={{ day: obj.format("MMM DD") }} onClick={onClick} />);
            })}
        </div>
    );
};

Week.propTypes = {
    week: React.PropTypes.array.isRequired,
    onClick: React.PropTypes.func.isRequired,
};

export default Week;
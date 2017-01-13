import React from 'react';

const Day = ({date, onClick}) => {
    return (
        <div 
            className="day"
            onClick={onClick}>
            {date.day}
        </div>
    );
};

Day.propTypes = {
    date: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired
};

export default Day;
import React from 'react';

const Day = ({date}) => {
    return (
        <span className='day'>
            {date.day}
        </span>
    );
};

Day.propTypes = {
    date: React.PropTypes.object.isRequired
};

export default Day;
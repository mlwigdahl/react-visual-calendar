import React from 'react';
import Day from './Day';

const Week = ({week}) => {
    return (
        <div className="week">
            {week.map(obj => {
                return (<Day key={obj.format('MMDD')} date={{ day: obj.format("ddd, MMM DD") }} />);
            })}
        </div>
    );
};

Week.propTypes = {
    week: React.PropTypes.array.isRequired
};

export default Week;
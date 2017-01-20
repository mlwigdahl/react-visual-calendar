import React from 'react';

// TODO -- fix rendering layout
// TODO -- deal with click now that we've extended the text

function renderEvents(dates) {
    return dates.map(date => date.events.map(
        (event, index) => {
            return (<div key={index}>
                <span>{`${event.label}`}</span>
                <br/>
                <span>{`${event.startTime} - ${event.endTime}`}</span>
            </div>);
        }
    ));
}

const Day = ({date, onClick, events}) => {
    return (
        <div 
            className="day"
            onClick={onClick}>
            <span>{date.day}</span>
            <br/>
            {renderEvents(events)}
        </div>
    );
};

Day.propTypes = {
    date: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired,
    events: React.PropTypes.array.isRequired,
};

export default Day;
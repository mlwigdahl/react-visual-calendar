import React from 'react';
import PropTypes from 'prop-types';

function EventItem({id, index, event, editEvent, deleteEvent}) {

    return (
        <div key={index}>
            <span className="date-label">{`${event.label}`}</span>
            <br/>
            <span className="date-start">{`${event.startTime}`}</span>
            <br/>
            <span className="date-end">{`${event.endTime}`}</span>
            <br/>
            <input type="submit"
                value="Edit"
                id={id}
                className="btn btn-primary"
                onClick={editEvent}/>
            <input type="submit"
                value="Delete"
                id={id}
                className="btn btn-primary"
                onClick={deleteEvent}/>
        </div>);
}

EventItem.propTypes = {
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    event: PropTypes.shape({
        icon: PropTypes.string,
        label: PropTypes.string,
        startTime: PropTypes.string,
        endDate: PropTypes.string,
    }),
    editEvent: PropTypes.func.isRequired,
    deleteEvent: PropTypes.func.isRequired,
};

export default EventItem;
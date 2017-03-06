import React from 'react';


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
    id: React.PropTypes.string.isRequired,
    index: React.PropTypes.number.isRequired,
    event: React.PropTypes.object.isRequired,
    editEvent: React.PropTypes.func.isRequired,
    deleteEvent: React.PropTypes.func.isRequired,
};

export default EventItem;
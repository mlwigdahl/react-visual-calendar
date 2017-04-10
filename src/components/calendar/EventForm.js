import React from 'react';
import PropTypes from 'prop-types';

function EventForm({onSubmit, onChange, onCancel, title, startTime, endTime, add, isSubmitValid}) {
    return (
        <form>
            <div className="form-group">
                <label htmlFor="title">Event Title</label>
                <input 
                    name="title"
                    value={title}
                    type="text"
                    onChange={onChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="start-time">Start Time</label>
                <input 
                    name="start-time"
                    value={startTime}
                    type="text"
                    onChange={onChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="end-time">End Time</label>
                <input 
                    name="end-time"
                    value={endTime}
                    type="text"
                    onChange={onChange}
                    className="form-control"
                />
            </div>
            <input
                type="submit"
                disabled={!isSubmitValid()}
                value={add ? "Add" : "Update"}
                className="btn btn-primary"
                onClick={onSubmit} />
            <input
                type="submit"
                value={"Cancel"}
                className="btn btn-primary"
                onClick={onCancel} />
        </form>
    );
}

EventForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    title: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    add: PropTypes.bool.isRequired,
    isSubmitValid: PropTypes.func.isRequired,
};

export default EventForm;
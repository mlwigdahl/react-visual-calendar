import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import moment from 'moment';

import * as cal from '../../ducks/calendarDuck';

import { bindActionCreators } from 'redux';

export class DayPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        
        this.redirectToMainPage = this.redirectToMainPage.bind(this);
        this.editEvent = this.editEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
        
        this.state = {
            formattedDate: moment(props.id).format("MMM DD")
        };
    }

    componentDidMount() {
         if (this.props.user == 0) {
            browserHistory.push(`/login`);
//            return (<LoginPage />); // TODO remove?
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            formattedDate: moment(nextProps.id).format("MMM DD")
        });
    }

    redirectToMainPage() {
        browserHistory.push(`/`);
    }

    editEvent(event) {
        event.preventDefault();
        browserHistory.push(`/day/${this.props.id}/event/${event.target.id}`);
    }

    deleteEvent(event) {
        event.preventDefault();
        debugger; // TODO MORE HERE
        this.props.actions.deleteEventRequest(this.props.date.id, event.target.id, this.props.user.id);
    }

    renderEvents(date) {
        return date.events.map(
            (event, index) => {
                return (<div key={index}>
                    <span className="date-label">{`${event.label}`}</span>
                    <br/>
                    <span className="date-start">{`${event.startTime}`}</span>
                    <br/>
                    <span className="date-end">{`${event.endTime}`}</span>
                    <br/>
                    <input type="submit"
                        value="Edit"
                        id={index}
                        className="btn btn-primary"
                        onClick={this.editEvent}/>
                    <input type="submit"
                        value="Delete"
                        id={index}
                        className="btn btn-primary"
                        onClick={this.deleteEvent}/>
                </div>);
            }
        );
    }

    render() {
        return (
            <div>
                <h1>{this.state.formattedDate}</h1>
                <div>{this.renderEvents(this.props.date)}</div>
                <input type="submit"
                    value="Go To Main"
                    className="btn btn-primary"
                    onClick={this.redirectToMainPage}/>
            </div>
        );
    }
}

DayPage.propTypes = {
    user: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    date: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {

    if (state.calendar.dateInfo === undefined) {
        return {
            user: 0,
            id: '',
            date: {},
        };
    }

    const id = ownProps.params.id; 
    const date = state.calendar.dateInfo.filter(info => info.date == id) || [];

    return {
        user: state.app.user.id,
        id,
        date
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(cal.creators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DayPage);
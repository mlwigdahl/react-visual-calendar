import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import moment from 'moment';

import { creators as dateCreators } from '../../ducks/dateDuck';
import { creators as evtCreators } from '../../ducks/eventDuck';
import EventItem from './EventItem';



export class DayPage extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        
        this.redirectToMainPage = this.redirectToMainPage.bind(this);
        this.editEvent = this.editEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
        this.addEvent = this.addEvent.bind(this);
        
        this.state = {
            formattedDate: moment(props.id).format("MMM DD")
        };
    }

    componentDidMount() {
        if (this.props.user === 0) {
            browserHistory.push(`/login`);
            return;
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
        this.props.actions.deleteEventRequest(this.props.id, Number(event.target.id), this.props.user);
    }

    addEvent(event) {
        // at this point, if the date has just been added, need to save it first.
        this.props.actions.insertDateRequest(this.props.id, this.props.user);
        event.preventDefault();
        browserHistory.push(`/day/${this.props.id}/event/new`);
    }

    renderEvents(events) {
        return Object.keys(events)
            .map((key, index) => {
                return (<EventItem 
                    key={key}
                    id={key}
                    index={index}
                    event={events[key]}
                    editEvent={this.editEvent}
                    deleteEvent={this.deleteEvent}
                />);
            }
        );
    }

    render() {
        return (
            <div>
                <h1>{this.state.formattedDate}</h1>
                <div>{this.renderEvents(this.props.events)}</div>
                <input type="submit"
                    value="New Event"
                    className="btn btn-primary"
                    onClick={this.addEvent}/>
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
    date: PropTypes.shape({
        events: PropTypes.arrayOf(PropTypes.number)
    }).isRequired,
    events: PropTypes.objectOf(
        PropTypes.shape({
            icon: PropTypes.string,
            label: PropTypes.string,
            startTime: PropTypes.string,
            endDate: PropTypes.string,
        })
    ).isRequired,
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps(state, ownProps) {
    const id = ownProps.params.id; 

    if (id === undefined) {
        return {
            user: 0,
            id: '',
            date: {},
            events: {},
        };
    }

    const date = state.dates[id];

    if (date === undefined) {
        return {
            user: state.app.user.id,
            id,
            date: {
                events: []
            },
            events: {}
        };
    }

    // TODO seems like this will register as state change every time.  Need better upfront comparison?

    const events = date.events
        .reduce((acc, key) => { acc[key] = state.events[key]; return acc; }, {});

    return {
        user: state.app.user.id,
        id,
        date,
        events,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...evtCreators, ...dateCreators }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DayPage);
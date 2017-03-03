import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import moment from 'moment';

import { bindActionCreators } from 'redux';

import * as evt from '../../ducks/eventDuck';
import EventForm from './EventForm';

export class EventPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        
        this.redirectToDayPage = this.redirectToDayPage.bind(this);
        this.isSubmitValid = this.isSubmitValid.bind(this);
        this.cancelRequest = this.cancelRequest.bind(this);
        this.submitRequest = this.submitRequest.bind(this);
        this.formChange = this.formChange.bind(this);
        
        this.state = {
            title: this.props.title,
            startTime: this.props.startTime,
            endTime: this.props.endTime,
            formattedDate: moment(this.props.id).format("MMM DD, YYYY"),
            add: this.props.add,
            error: undefined,
        }; // TODO does this all really need to be state?
    }

    componentDidMount() {
         if (this.props.user == 0) {
            browserHistory.push(`/login`);
        }
    }

/*    componentWillReceiveProps(nextProps) {
    } */

    redirectToDayPage() {
        browserHistory.push(`/day/${this.props.id}`);
    }

    isSubmitValid() {
        return true; // TODO more
    }

    submitRequest(event) {
        event.preventDefault();

        if (!this.isSubmitValid()) {
            this.setState({ error: 'Unable to submit (internal error)'});
            return;
        }

        // TODO add icon and endDate stuff here later
debugger;
        if (this.props.eventId == 0) {
            this.props.actions.insertEventRequest(this.props.id, { 
                label: this.state.title,
                startTime: this.state.startTime,
                endTime: this.state.endTime
            }, this.props.user);
        }
        else {
            this.props.actions.updateEventRequest(this.props.id, this.props.eventId, { 
                label: this.state.title,
                startTime: this.state.startTime,
                endTime: this.state.endTime,
            }, this.props.user);
        }
    }

    cancelRequest(event) {
        event.preventDefault();

        this.redirectToDayPage();
    }

    formChange(event) {
        const field = event.target.name;

        if (field == 'title') {
            this.setState({ title: event.target.value });
        }
        else if (field == 'start-time') {
            this.setState({ startTime: event.target.value });
        }
        else if (field == 'end-time') {
            this.setState({ endTime: event.target.value });
        }
    }

    render() {
        return (
            <div>
                <h1>Event Data</h1>
                <div>
                    <h2>{this.state.formattedDate}</h2>
                    <EventForm 
                        onSubmit={this.submitRequest}
                        onChange={this.formChange}
                        onCancel={this.cancelRequest}
                        title={this.state.title}
                        startTime={this.state.startTime}
                        endTime={this.state.endTime}
                        add={this.state.add}
                        isSubmitValid={this.isSubmitValid}
                    />
                </div>
            </div>
        );
    }
}

EventPage.propTypes = {
    user: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    eventId: PropTypes.number.isRequired,
    title: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    add: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    // user, id and eventId come in via the routing as params

    if (ownProps.params.id === undefined) {
        return {
            user: 0,
            id: '',
            eventId: 0,
            add: false,
        };
    }

    if (ownProps.params.eventId == 'new') {
        return {
            user: state.app.user.id,
            id: ownProps.params.id,
            eventId: 0, // this will be replaced when submitted
            add: true,
            title: '',
            startTime: '',
            endTime: '',
        };
    }

    const event = state.events[Number(ownProps.params.eventId)];

    return {
        user: state.app.user.id,
        id: ownProps.params.id,
        eventId: Number(ownProps.params.eventId),
        title: event.label,
        startTime: event.startTime,
        endTime: event.endTime,
        add: false,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(evt.creators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);
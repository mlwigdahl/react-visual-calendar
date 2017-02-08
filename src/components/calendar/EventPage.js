import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import moment from 'moment';

import { bindActionCreators } from 'redux';

import * as cal from '../../ducks/calendarDuck';

export class DayPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        
        this.redirectToMainPage = this.redirectToDayPage.bind(this);
        this.isSubmitValid = this.isSubmitValid.bind(this);
        this.isDeleteValid = this.isDeleteValid.bind(this);
        this.cancelRequest = this.cancelRequest.bind(this);
        this.deleteRequest = this.deleteRequest.bind(this);
        this.submitRequest = this.submitRequest.bind(this);
        this.formChange = this.formChange.bind(this);
        
        this.state = {
            title: this.props.title,
            startTime: this.props.startTime,
            endTime: this.props.endTime,
            formattedDate: moment(this.props.date).format("MMM DD, YYYY"),
            add: this.props.add,
            error: undefined,
        };
    }

    componentWillReceiveProps(nextProps) {
    }

    redirectToDayPage() {
        browserHistory.push(`/day/${this.props.date}`);
    }

    isSubmitValid() {
        return true; // TODO more
    }

    isDeleteValid() {
        return true; // TODO more
    }

    deleteRequest(event) {
        event.preventDefault();

        if (!this.isDeleteValid()) {
            this.setState({ error: 'Unable to delete (internal error)'});
            return;
        }

        // TODO now generate the appropriate data action (insert/update/delete) based on action

        //this.props.actions.loginRequest(this.state.username, this.state.password);    
    }

    submitRequest(event) {
        event.preventDefault();

        if (!this.isSubmitValid()) {
            this.setState({ error: 'Unable to submit (internal error)'});
            return;
        }

        // TODO now generate the appropriate data action (insert/update/delete) based on action

        //this.props.actions.loginRequest(this.state.username, this.state.password);
    }

    cancelRequest(event) {
        event.preventDefault();

        this.redirectToDayPage();
    }

    formChange(event) {
        const field = event.target.name;
        // TODO update state here...

        /*
        if (field == 'usr') {
            this.setState({ username: event.target.value });
        }
        else if (field == 'pwd') {
            this.setState({ password: event.target.value });
        }
        */
    }

    render() {
        return (
            <div>
                <h1>Event Data</h1>
                <div>
                    <h2>{this.state.formattedDate}</h2>
                    <EventForm 
                        onSubmit={this.submitRequest}
                        onDelete={this.deleteRequest}
                        onChange={this.formChange}
                        onCancel={this.cancelRequest}
                        title={this.state.title}
                        startTime={this.state.startTime}
                        endTime={this.state.endTime}
                        add={this.state.add}
                        isSubmitValid={this.isSubmitValid}
                        isDeleteValid={this.isDeleteValid}
                    />
                </div>
            </div>
        );
    }
}

DayPage.propTypes = {
    title: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    date: PropTypes.string.isRequired,
    add: PropTypes.bool.isRequired,
};

function mapStateToProps(state, ownProps) {
    // TODO all of this should be coming in as props from the parent...
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(cal.creators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DayPage);
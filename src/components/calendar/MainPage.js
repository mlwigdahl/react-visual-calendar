import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // Make sure to import the default stylesheet

// import { bindActionCreators } from 'redux';

export class MainPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        
        this.redirectToDayPage = this.redirectToDayPage.bind(this);
    }

    redirectToDayPage(event) {
        const id = event.format('MMMDDYYYY');
        browserHistory.push(`/day/${id}`);
    }

    render() {

        let today = new Date();
        let minDate = Number(new Date()) - (24*60*60*1000) * 52; // One week before today

        return (
            <div>
                <h1>Calendar</h1>
                <InfiniteCalendar
                    width={400}
                    height={600}
                    selectedDate={today}
                    disabledDays={[0,6]}
                    minDate={minDate}
                    keyboardSupport={true}
                    afterSelect={this.redirectToDayPage}
                />
            </div>
        );
    }
}

function mapStateToProps(/*state, ownProps*/) {
/*    const mapped = {
        authors: [...state.authors].sort( (a, b) => {
            return a.id.localeCompare(b.id);
        })
    };
    
    return mapped; */
    return {};
}

function mapDispatchToProps(/*dispatch*/) {
    return {
//        actions: bindActionCreators(authorActions, dispatch)
    };
}

MainPage.propTypes = {
//    actions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
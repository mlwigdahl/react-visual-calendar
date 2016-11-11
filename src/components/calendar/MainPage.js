import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
// import { bindActionCreators } from 'redux';

export class MainPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        
        this.redirectToDayPage = this.redirectToDayPage.bind(this);
    }

    redirectToDayPage(id) {
        browserHistory.push(`/day/${id}`);
    }

    render() {
        return (
            <div>
                <h1>Calendar</h1>
                <input type="submit"
                    value="Go To Day"
                    className="btn btn-primary"
                    onClick={this.redirectToDayPage}/>
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
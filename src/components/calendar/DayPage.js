import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
// import { bindActionCreators } from 'redux';

export class DayPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        
        this.redirectToMainPage = this.redirectToMainPage.bind(this);
    }

    redirectToMainPage() {
        browserHistory.push('/');
    }

    render() {
        return (
            <div>
                <h1>Day</h1>
                <input type="submit"
                    value="Go To Main"
                    className="btn btn-primary"
                    onClick={this.redirectToMainPage}/>
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

DayPage.propTypes = {
//    actions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DayPage);
import React, {PropTypes} from 'react';
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
                <div>{this.props.id}</div>
                <input type="submit"
                    value="Go To Main"
                    className="btn btn-primary"
                    onClick={this.redirectToMainPage}/>
            </div>
        );
    }
}

DayPage.propTypes = {
    id: PropTypes.string.isRequired,
};

function mapStateToProps(state, ownProps) {
    const id = ownProps.params.id; // from the path '/course/:id'

    return {
        id
    };
}

function mapDispatchToProps(/*dispatch*/) {
    return {
//        actions: bindActionCreators(authorActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DayPage);
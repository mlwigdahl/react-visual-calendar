// This component handles the App template used on every page.

import React from 'react';
import PropTypes from 'prop-types';
import Header from './common/Header';
import {connect} from 'react-redux';

class App extends React.PureComponent {
    render() {
        return (
            <div className="container-fluid">
                <Header />
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
};

function mapStateToProps(/*state, ownProps*/) {
    return {
    };
}

export default connect(mapStateToProps)(App);
import React from 'react';
import PropTypes from 'prop-types';

class InitialScroll extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.setNodeRef = this.setNodeRef.bind(this);
    }

    componentDidMount() {
        if (this.props.abs !== undefined) {
            this.node.scrollTop = this.props.abs;
        }
        else if (this.props.frac !== undefined) {
            this.node.scrollTop = this.node.scrollHeight * this.props.frac;
        }        
    }

    componentWillUnmount() {
        this.props.saveScroll(this.node.scrollTop);
    }

    setNodeRef(node) {
        this.node = node;
    }

    render() {
        return (
            <div
                style={{overflow: 'hidden' }}>
                <div 
                    style={{overflowY: 'scroll', width: '102%', maxHeight: this.props.height}} 
                    onScroll={this.props.onScroll}
                    ref={this.setNodeRef}
                >
                    {this.props.children}
                </div>
            </div>
        );
    }
}

InitialScroll.propTypes = {
    height: PropTypes.number.isRequired,
    onScroll: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    abs: PropTypes.number,
    frac: PropTypes.number,
    saveScroll: PropTypes.func.isRequired,
};

export default InitialScroll; // add more (and add the named export to the class) if we ever want Redux state support here.
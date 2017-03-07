import React, {PropTypes} from 'react';

class InitialScroll extends React.Component {
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

    setNodeRef(node) {
        this.node = node;
    }

    render() {
        return (
            <div 
                style={{overflowY: 'scroll', maxHeight: this.props.height}} 
                onScroll={this.props.onScroll}
                ref={this.setNodeRef}
            >
                {this.props.children}
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
};

export default InitialScroll; // add more (and add the named export to the class) if we ever want Redux state support here.
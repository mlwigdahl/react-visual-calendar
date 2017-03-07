import React, {PropTypes} from 'react';

class CalendarScroll extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.setNodeRef = this.setNodeRef.bind(this);
    }

    componentDidMount() {
        this.node.scrollTop = this.node.scrollHeight / 3;
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

CalendarScroll.propTypes = {
    height: PropTypes.number.isRequired,
    onScroll: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default CalendarScroll; // add more (and add the named export to the class) if we ever want Redux state support here.
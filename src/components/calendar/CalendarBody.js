import React from 'react';

import Week from './Week';

function renderWeeks(dates, events, weeks, currentDate) {

    const weekRet = [];

    for (const week of weeks) {
        weekRet.push(
            <Week
                key={week.format("wwYYYY")}
                weekStart={week}
                curDate={currentDate}
                dates={dates}
                events={events}
            />);
    }

    return weekRet;
}

// TODO interpose an autoscroll component here?
function CalendarBody({onScroll, height, dates, events, weeks, currentDate}) {
    return (
        <div style={{overflowY: 'scroll', maxHeight: height}} onScroll={onScroll}>
            <div className="calendar-class">
                {renderWeeks(dates, events, weeks, currentDate)}
            </div>
        </div>
    );
}

CalendarBody.propTypes = {
    onScroll: React.PropTypes.func.isRequired,
    height: React.PropTypes.number.isRequired,
    dates: React.PropTypes.object.isRequired,
    events: React.PropTypes.object.isRequired,
    weeks: React.PropTypes.array.isRequired,
    currentDate: React.PropTypes.string.isRequired,
};

export default CalendarBody;
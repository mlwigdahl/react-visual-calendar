import React from 'react';

import Week from './Week';

function renderWeeks(user, dates, events, weeks, currentDate) {

    const weekRet = [];

    for (const week of weeks) {
        weekRet.push(
            <Week
                key={week.format("wwYYYY")}
                weekStart={week}
                user={user}
                curDate={currentDate}
                dates={dates}
                events={events}
            />);

            // TODO do we need to re-add the "week" attribute?
    }

    return weekRet;
}

// TODO interpose an autoscroll component here?
function CalendarBody({onScroll, height, user, dates, events, weeks, currentDate}) {
    return (
        <div style={{overflowY: 'scroll', maxHeight: height}} onScroll={onScroll}>
            <div className="calendar-class">
                {renderWeeks(user, dates, events, weeks, currentDate)}
            </div>
        </div>
    );
}

CalendarBody.propTypes = {
    onScroll: React.PropTypes.func.isRequired,
    height: React.PropTypes.number.isRequired,
    user: React.PropTypes.number.isRequired,
    dates: React.PropTypes.object.isRequired,
    events: React.PropTypes.object.isRequired,
    weeks: React.PropTypes.array.isRequired,
    currentDate: React.PropTypes.string.isRequired,
};

export default CalendarBody;
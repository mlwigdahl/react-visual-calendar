import React from 'react';

import InitialScroll from '../common/InitialScroll';
import Week from './Week';

function renderWeeks(dates, events, weeks, currentDate) {

    const weekRet = [];

    for (const week of weeks) {
        weekRet.push(
            <Week
                key={week.format("YYYYMMDD")}
                weekStart={week}
                curDate={currentDate}
                dates={dates}
                events={events}
            />);
    }

    return weekRet;
}

function CalendarBody({onScroll, height, dates, events, weeks, currentDate}) {
    return (
        <InitialScroll
            height={height}
            onScroll={onScroll}
            frac={0.35}
        >
            <div className="calendar-class">
                {renderWeeks(dates, events, weeks, currentDate)}
            </div>
        </InitialScroll>
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
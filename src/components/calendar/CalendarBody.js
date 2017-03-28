import React, { PropTypes } from 'react';

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

function CalendarBody({onScroll, height, dates, events, weeks, currentDate, saveScroll, scrollPos}) {
    return (
        <InitialScroll
            height={height}
            onScroll={onScroll}
            abs={scrollPos}
            frac={0.35}
            saveScroll={saveScroll}
        >
            <div className="calendar-class">
                {renderWeeks(dates, events, weeks, currentDate)}
            </div>
        </InitialScroll>
    );
}

CalendarBody.propTypes = {
    onScroll: PropTypes.func.isRequired,
    saveScroll: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired,
    dates: PropTypes.objectOf(
        PropTypes.shape({
            events: PropTypes.arrayOf(PropTypes.number)
        })
    ).isRequired,
    events: PropTypes.objectOf(
        PropTypes.shape({
            icon: PropTypes.string,
            label: PropTypes.string,
            startTime: PropTypes.string,
            endDate: PropTypes.string,
        })
    ).isRequired,
    weeks: PropTypes.array.isRequired,
    currentDate: PropTypes.string.isRequired,
    scrollPos: PropTypes.number,
};

export default CalendarBody;
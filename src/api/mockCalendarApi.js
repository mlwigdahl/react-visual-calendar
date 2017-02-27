// import delay from './delay';
// import moment from 'moment'; // TODO no need for this at the moment...

//import { call, apply/*, put*/ } from 'redux-saga/effects';
//import { target, apiPath, port, cors } from '../api/AppApi';

import { dates } from './mockDateApi';
import { events } from './mockEventApi';

export const calendar = {
    selectedDate: '20170101',
    minDate: '20161211',
    maxDate: '20170204',
    dates: [1],
};

const state = {
    calendar,
    dates,
    events,
};

/*let maxDate = 2;

const icon = "test-icon-url";*/

const CalendarApi = {
    loadCalendar: function* (userId) {
        try {
            if (Number.isInteger(userId) === false) {
                throw 'loadCalendar(): parameter not an integer';
            }

            if (userId !== 1) { // this is the arbitrary "good ID"...
                throw 'loadCalendar(): user ID not found';
            }
            /*
            yield call(fetch, 
                `http://${target}:${port}/${apiPath}/user/${userId}/calendar`,
                { method: 'GET', mode: cors }); 
            const resp = new Response(); // minor differences to the main API since we don't actually call fetch...
            yield apply(resp, resp.json);
            */
            yield 1; // to suppress lint error
            return { ...state.calendar };
        } catch(error) {
            return {};
        }
    },

// TODO more here
/*

    loadDateIcon: function* (dateId, userId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(icon);
            }, delay);
        });
    },
    
    updateDateIcon: function* (icon, dateId, userId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(dateId);
            }, delay);
        });
    },
*/
};

export default CalendarApi;
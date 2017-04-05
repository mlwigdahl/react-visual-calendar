
// import moment from 'moment';

//import { call, apply/*, put*/ } from 'redux-saga/effects';
//import { target, apiPath, port, cors } from '../api/AppApi';

import { dates } from './mockDateApi';
import { events } from './mockEventApi';

export const calendar = {
    minDate: '20161002',
    maxDate: '20170301',
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
    loadDateIcon: function* (dateId, userId) {
        try {
            if (Number.isInteger(userId) === false) {
                throw 'loadCalendar(): user ID not an integer';
            }

            if (userId !== 1) { // this is the arbitrary "good ID"...
                throw 'loadCalendar(): user ID not found';
            }

            if (Number.isInteger(dateId) === false) {
                throw 'loadDateIcon(): dateId not an integer';
            }

            yield 1;

            return { icon: 'icon' };
        }
        catch (error) {
            return {};
        }
    },
    
    updateDateIcon: function* (icon, dateId, userId) {
        try {
            if (Number.isInteger(userId) === false) {
                throw 'loadCalendar(): user ID not an integer';
            }

            if (userId !== 1) { // this is the arbitrary "good ID"...
                throw 'loadCalendar(): user ID not found';
            }

            if (Number.isInteger(dateId) === false) {
                throw 'loadDateIcon(): dateId not an integer';
            }

            if (icon === undefined) {
                throw 'loadDateIcon(): icon not defined';
            }

            yield 1;

            return { icon: 'icon' };
        }
        catch (error) {
            return {};
        }
    },

};

export default CalendarApi;
// import delay from './delay';
// import moment from 'moment'; // TODO no need for this at the moment...

import { call, apply/*, put*/ } from 'redux-saga/effects';
import { target, apiPath, port, cors } from '../api/AppApi';

const calendar = {
    id: 0,
    selectedDate: '20170101',
    minDate: '20161211',
    maxDate: '20170204',
    dateInfo: [
        {
            date: '20170101',
            events: [
                {
                    icon: 'scissors.jpg',
                    label: 'Haircut',
                    startTime: '08:15 AM',
                    endTime: '10:15 AM',
                    endDate: '20170101',
                },
                {
                    icon: 'food.jpg',
                    label: 'Lunch! 😁',
                    startTime: '11:30 AM',
                    endTime: '12:30 PM',
                    endDate: '20170101',
                }
            ]
        }
    ]
};

const state = {
    calendars: [
        calendar,
    ],
};

const dates = [
    { date: '20170101', 
        events: 
        [
            { startTime: '03:45 PM', endTime: '04:45 PM', endDate: '20170101', icon: "meeting-icon-url", label: "3:45 meeting 😒😒 (Red conference room)" },
            { startTime: '11:30 AM', endTime: '12:30 PM', endDate: '20170101', icon: "lunch-icon-url", label: "Lunch! 😁" },
        ]
    },
    { date: '20161231',
        events: [],
    },
];

/*let maxDate = 2;

const icon = "test-icon-url";*/

const CalendarApi = {
    loadCalendar: function* (userId) {
        try {
            yield call(fetch, 
                `http://${target}:${port}/${apiPath}/user/${userId}/calendar`,
                { method: 'GET', mode: cors }); 
            const resp = new Response(); // minor differences to the main API since we don't actually call fetch...
            /*const json =*/ yield apply(resp, resp.json);
            return { ...state.calendars[0] };
        } catch(error) {
            return []; // TODO more here
        }
    },

    loadDateRange: function* (startDate, endDate, calId) {
        try {
            yield call(fetch,
                `http://${target}:${port}/${apiPath}/calendar/${calId}/dateRange?${startDate}&${endDate}&${calId}`,
                { method: 'GET', mode: cors });
            const resp = new Response(); // minor differences to the main API since we don't actually call fetch...
            /*const json =*/ yield apply(resp, resp.json);
            return [...(dates.filter(item => parseInt(item.date, 10) >= parseInt(startDate, 10) 
                    && parseInt(item.date, 10) <= parseInt(endDate, 10)))];
        } catch(error) {
            return []; // TODO more here
        }
    },

// TODO more here
/*
    insertDate: function* (date, calId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({...date, id: maxDate++});
            }, delay);
        });
    },

    updateDate: function* (date, calId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({...date});
            }, delay);
        });
    },

    deleteDate: function* (dateId, calId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(dateId);
            }, delay);
        });
    },

    loadDateIcon: function* (dateId, calId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(icon);
            }, delay);
        });
    },
    
    updateDateIcon: function* (icon, dateId, calId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(dateId);
            }, delay);
        });
    }
*/
};

export default CalendarApi;
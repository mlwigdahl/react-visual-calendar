// import delay from './delay';
// import moment from 'moment'; // TODO no need for this at the moment...

//import { call, apply/*, put*/ } from 'redux-saga/effects';
//import { target, apiPath, port, cors } from '../api/AppApi';

const calendar = {
    selectedDate: '20170101',
    minDate: '20161211',
    maxDate: '20170204',
    dateInfo: [
        {
            id: 1,
            date: '20170101',
            events: [
                {
                    id: 1,
                    icon: 'scissors.jpg',
                    label: 'Haircut',
                    startTime: '08:15 AM',
                    endTime: '10:15 AM',
                    endDate: '20170101',
                },
                {
                    id: 2,
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
    calendar,
};

const dates = [
    { 
        id: 1,
        date: '20170101', 
        events: 
        [
            { id: 3, startTime: '03:45 PM', endTime: '04:45 PM', endDate: '20170101', icon: "meeting-icon-url", label: "3:45 meeting 😒😒 (Red conference room)" },
            { id: 4, startTime: '11:30 AM', endTime: '12:30 PM', endDate: '20170101', icon: "lunch-icon-url", label: "Lunch! 😁" },
        ]
    },
    { 
        id: 2,
        date: '20161231',
        events: [],
    },
];

/*let maxDate = 2;

const icon = "test-icon-url";*/

const CalendarApi = {
    loadCalendar: function* (userId) {
        try {
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
            return []; // TODO more here
        }
    },

    loadDateRange: function* (startDate, endDate, userId) {
        try {
            /*
            yield call(fetch,
                `http://${target}:${port}/${apiPath}/user/${userId}/dateRange?${startDate}&${endDate}`,
                { method: 'GET', mode: cors });
            const resp = new Response(); // minor differences to the main API since we don't actually call fetch...
            yield apply(resp, resp.json);
            */
            yield 1; // to suppress lint error
            return [...(dates.filter(item => parseInt(item.date, 10) >= parseInt(startDate, 10) 
                    && parseInt(item.date, 10) <= parseInt(endDate, 10)))];
        } catch(error) {
            return []; // TODO more here
        }
    },

    // TODO START HERE -- assign an ID appropriately...

    insertEvent: function* (date, event, userId) {
        try {
            /*
            yield call(fetch,
                `http://${target}:${port}/${apiPath}/user/${userId}/date/${date.id}/event`,
                {method: 'POST', mode: cors });
            const resp = new Response(); // minor differences to the main API since we don't actually call fetch...
            yield apply(resp, resp.json);
            */
            yield 1; // to suppress lint error
            return {...event};
        } catch(error) {
            return []; // TODO more here
        }
    },

    updateEvent: function* (date, event, userId) {
        try {
            /*
            yield call(fetch,
                `http://${target}:${port}/${apiPath}/user/${userId}/date/${date.id}/event/${event.id}`,
                {method: 'PATCH', mode: cors });
            const resp = new Response(); // minor differences to the main API since we don't actually call fetch...
            yield apply(resp, resp.json);
            */
            yield 1; // to suppress lint error
            return {...event};
        } catch(error) {
            return []; // TODO more here
        }
    },

    deleteEvent: function* (dateId, eventId, userId) {
        try {
            /*
            yield call(fetch,
                `http://${target}:${port}/${apiPath}/user/${userId}/date/${date.id}/event/${event.id}`,
                {method: 'DELETE', mode: cors });
            const resp = new Response(); // minor differences to the main API since we don't actually call fetch...
            yield apply(resp, resp.json);
            */
            yield 1; // to suppress lint error
            return {dateId, eventId};
        } catch(error) {
            return []; // TODO more here
        }
    },

// TODO more here
/*
    insertDate: function* (date, userId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({...date, id: maxDate++});
            }, delay);
        });
    },

    updateDate: function* (date, userId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({...date});
            }, delay);
        });
    },

    deleteDate: function* (dateId, userId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(dateId);
            }, delay);
        });
    },

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

import { calendar } from './mockCalendarApi';

export const dates = [
    {
        id: 1,
        date: '20170101',
        events: [1, 2],
    },
];

const datesNew = [
    { 
        id: 1,
        date: '20170101', 
        events: [3, 4]
    },
    { 
        id: 2,
        date: '20161231',
        events: [],
    },
];

const eventsNew = [
    { id: 3, startTime: '03:45 PM', endTime: '04:45 PM', endDate: '20170101', icon: "meeting-icon-url", label: "3:45 meeting 😒😒 (Red conference room)" },
    { id: 4, startTime: '11:30 AM', endTime: '12:30 PM', endDate: '20170101', icon: "lunch-icon-url", label: "Lunch! 😁" },
];

const DateApi = {
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
            const dates = datesNew.filter(item => parseInt(item.date, 10) >= parseInt(startDate, 10) 
                && parseInt(item.date, 10) <= parseInt(endDate, 10));
            const dateEvents = dates
                .map(date => date.events)
                .reduce((acc, events) => { return acc.concat(events); }, []);
            return { 
                dates: [ ...dates ], 
                events: [ ...eventsNew.filter(event => dateEvents.includes(event.id)) ]
            };
        } catch(error) {
            return []; // TODO more here
        }
    },

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
*/
};

export default DateApi;
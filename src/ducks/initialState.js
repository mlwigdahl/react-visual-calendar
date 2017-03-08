import moment from 'moment';

export default {
    async: {
        callsActive: 0,
        lastError: undefined
    },
    app: {
        user: {
            id: undefined,
            name: undefined,
            error: undefined,
        },
        width: 600,
        height: 542,
        currentDate: moment().format("YYYYMMDD"),
    },
    calendar: {},
    dates: {},
    events: {},
};

/* // example calendar
const calendar = {
    minDate: '20161211',
    maxDate: '20170204',
    dates: [1, 2],
};

// example dates
const dates = {
    '20170101': {
        events: [1, 2],
    },
};

// example events
const events = {
    1: {
        icon: 'scissors.jpg',
        label: 'Haircut',
        startTime: '08:15 AM',
        endTime: '10:15 AM',
        endDate: '20170101',
    },
    2: {
        icon: 'food.jpg',
        label: 'Lunch! 😁',
        startTime: '11:30 AM',
        endTime: '12:30 PM',
        endDate: '20170101',
    },
};

*/
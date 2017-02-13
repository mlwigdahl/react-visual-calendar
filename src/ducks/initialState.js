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
        height: 600,
        currentDate: moment().format("YYYYMMDD"),
    },
    calendar: {},
};

/* // example calendar
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
                    id, 2,
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
*/
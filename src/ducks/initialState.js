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
        activeCalId: 0,
    },
    calendars: [],
};
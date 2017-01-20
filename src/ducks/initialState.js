import moment from 'moment';

export default {
    ajax: {
        callsActive: 0,
        lastError: undefined
    },
    app: {
        user: {
            id: 1, // TODO this is mocked
            name: undefined,
        },
        width: 600,
        height: 600,
        currentDate: moment().format("YYYYMMDD"),
        activeCalId: 0,
    },
    calendars: [ // TODO this is mocked
        {
            id: 0,
            selectedDate: '20170101',
            minDate: '20161211',
            maxDate: '20170204',
            dateInfo: [
                {
                    date: '20170101',
                    events: [
                        {
                            icon: 'icon_slug',
                            label: 'label_text',
                            startTime: '08:15 AM',
                            endTime: '10:15 AM',
                            endDate: '20170101',
                        }
                    ]
                }
            ]
        }
    ],
};

/*

*/
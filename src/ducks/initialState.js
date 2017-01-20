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
        height: 400,
        currentDate: moment().format("YYYYMMDD"),
        activeCalId: 0,
    },
    calendars: [ // TODO this is mocked
        {
            id: 0,
            selectedDate: '20170101',
            minDate: '20161218',
            maxDate: '20170128',
            dateInfo: [
                {
                    date: '20170101',
                    events: [
                        {
                            icon: 'icon_slug',
                            label: 'label_text',
                            startTime: '8:15 AM',
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
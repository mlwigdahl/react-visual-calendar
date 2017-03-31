import moment from 'moment';

export const dates = {
    '20170101': {
        events: [1, 2],
    },
};

const datesNew = {
    '20170102': { 
        events: [3, 4]
    },
    '20161231': { 
        events: [],
    },
};

const DateApi = {
    loadDateRange: function* (startDate, endDate, userId) {
        try {
            if (moment(startDate, "YYYYMMDD").format("YYYYMMDD") !== startDate) {
                throw('loadDateRange(): startDate in incorrect format');
            }

            if (moment(endDate, "YYYYMMDD").format("YYYYMMDD") !== endDate) {
                throw('loadDateRange(): endDate in incorrect format');
            }

            if (userId !== 1) { // the arbitrary "good ID"
                throw('loadDateRange(): user ID not found');
            }

            if (parseInt(startDate, 10) >= parseInt(endDate, 10)) {
                throw('loadDateRange(): End date must be after start date');
            }


            const compDates = { ...dates, ...datesNew };
            /*
            yield call(fetch,
                `http://${target}:${port}/${apiPath}/user/${userId}/date?${startDate}&${endDate}`,
                { method: 'GET', mode: cors });
            const resp = new Response(); // minor differences to the main API since we don't actually call fetch...
            yield apply(resp, resp.json);
            */
            yield 1; // to suppress lint error
            const datesAdd = Object.keys(compDates)
                .filter(key => parseInt(key, 10) >= parseInt(startDate, 10) 
                    && parseInt(key, 10) <= parseInt(endDate, 10))
                .reduce((acc, key) => { acc[key] = compDates[key]; return acc; }, {});

            return datesAdd;
        } catch(error) {
            return {}; // TODO more here
        }
    },

    insertDate: function* (dateId, userId) {
        try {
            if (moment(dateId, "YYYYMMDD").format("YYYYMMDD") !== dateId) {
                throw('insertDate(): dateId in incorrect format');
            }

            if (userId !== 1) { // the arbitrary "good ID"
                throw('insertDate(): user ID not found');
            }
            /*
            yield call(fetch,
                `http://${target}:${port}/${apiPath}/user/${userId}/date/${date.id}`,
                {method: 'POST', mode: cors });
            const resp = new Response(); // minor differences to the main API since we don't actually call fetch...
            yield apply(resp, resp.json);
            */
            yield 1; // to suppress lint error
            return { id: dateId, data: { events: [] } };
        } catch(error) {
            return {}; // TODO more here
        }
    },

    updateDate: function* (date, userId) {
        try {
            if (userId !== 1) {
                throw('updateDate(): user ID not found');
            }
            yield 1; // to suppress lint error
            return { events: [] };
        } catch(error) {
            return {}; // TODO more here
        }
    },

    deleteDate: function* (dateId, userId) {
        try {
            if (userId !== 1) {
                throw('updateDate(): user ID not found');
            }
            yield 1; // to suppress lint error
            return { dateId };
        } catch(error) {
            return {}; // TODO more here
        }
    },
};

export default DateApi;
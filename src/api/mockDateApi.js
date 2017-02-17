
export const dates = {
    1: {
        date: '20170101',
        events: [1, 2],
    },
};

const datesNew = {
    2: { 
        date: '20170102', 
        events: [3, 4]
    },
    3: { 
        date: '20161231',
        events: [],
    },
};

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
            const dates = Object.keys(datesNew)
                .filter(key => parseInt(datesNew[key].date, 10) >= parseInt(startDate, 10) 
                    && parseInt(datesNew[key].date, 10) <= parseInt(endDate, 10))
                .reduce((acc, key) => { acc[key] = datesNew[key]; return acc; }, {});

            return { ...dates };
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
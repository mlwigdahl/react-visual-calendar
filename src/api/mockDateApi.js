
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
            /*
            yield call(fetch,
                `http://${target}:${port}/${apiPath}/user/${userId}/dateRange?${startDate}&${endDate}`,
                { method: 'GET', mode: cors });
            const resp = new Response(); // minor differences to the main API since we don't actually call fetch...
            yield apply(resp, resp.json);
            */
            yield 1; // to suppress lint error
            const datesAdd = Object.keys(datesNew)
                .filter(key => parseInt(key, 10) >= parseInt(startDate, 10) 
                    && parseInt(key, 10) <= parseInt(endDate, 10))
                .reduce((acc, key) => { acc[key] = datesNew[key]; return acc; }, {});

            return { ...dates, ...datesAdd };
        } catch(error) {
            return []; // TODO more here
        }
    },

/* // TODO these are wrong -- no "date" property any more.
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
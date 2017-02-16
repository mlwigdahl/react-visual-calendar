

export const events = [
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
];

function getMaxEventId() {
    return events.reduce((acc, event) => { return event.id > acc ? event.id : acc; });
}

const EventApi = {
    insertEvent: function* (dateId, event, userId) {
        try {
            /*
            yield call(fetch,
                `http://${target}:${port}/${apiPath}/user/${userId}/date/${date.id}/event`,
                {method: 'POST', mode: cors });
            const resp = new Response(); // minor differences to the main API since we don't actually call fetch...
            yield apply(resp, resp.json);
            */
            debugger;
            yield 1; // to suppress lint error
            return { ...event, id: getMaxEventId(dateId) + 1 };
        } catch(error) {
            return []; // TODO more here
        }
    },

    updateEvent: function* (dateId, event, userId) {
        try {
            /*
            yield call(fetch,
                `http://${target}:${port}/${apiPath}/user/${userId}/date/${date.id}/event/${event.id}`,
                {method: 'PATCH', mode: cors });
            const resp = new Response(); // minor differences to the main API since we don't actually call fetch...
            yield apply(resp, resp.json);
            */
            yield 1; // to suppress lint error
            return { ...event };
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
            return eventId;
        } catch(error) {
            return []; // TODO more here
        }
    },    
};

export default EventApi;
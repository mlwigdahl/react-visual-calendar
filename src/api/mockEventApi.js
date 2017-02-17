

export const events = {
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

const eventsNew = {
    3: { startTime: '03:45 PM', endTime: '04:45 PM', endDate: '20170101', icon: "meeting-icon-url", label: "3:45 meeting 😒😒 (Red conference room)" },
    4: { startTime: '11:30 AM', endTime: '12:30 PM', endDate: '20170101', icon: "lunch-icon-url", label: "Lunch! 😁" },
};

function getMaxEventId() {
    return events.reduce((acc, event) => { acc = event.id > acc ? event.id : acc; return acc; });
}

const EventApi = {
    loadEventRange: function* (dates, userId) {
        const dateEvents = dates
            .map(date => date.events)
            .reduce((acc, events) => acc.concat(events), []);

        yield 1; // to suppress lint error
        return { ...eventsNew
            .keys()
            .filter(key => dateEvents.includes(key))
            .reduce((acc, key) => { acc[key] = eventsNew[key]; return acc; }, {})
        };
    },

    insertEvent: function* (dateId, event, userId) {
/*
                const dateEvents = 
                
                events: [ ...eventsNew.filter(event => dateEvents.includes(event.id)) ]
*/

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
            return { id: getMaxEventId(dateId) + 1, event: { ...event } };
        } catch(error) {
            return []; // TODO more here
        }
    },

    updateEvent: function* (dateId, eventId, event, userId) {
        try {
            /*
            yield call(fetch,
                `http://${target}:${port}/${apiPath}/user/${userId}/date/${date.id}/event/${event.id}`,
                {method: 'PATCH', mode: cors });
            const resp = new Response(); // minor differences to the main API since we don't actually call fetch...
            yield apply(resp, resp.json);
            */
            yield 1; // to suppress lint error
            return { id: eventId, event: { ...event } };
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
import delay from './delay';
// import moment from 'moment'; // TODO no need for this at the moment...


const calendar = {
    id: 0,
    selectedDate: '20170101',
    minDate: '20161211',
    maxDate: '20170204',
    dateInfo: [
        {
            date: '20170101',
            events: [
                {
                    icon: 'scissors.jpg',
                    label: 'Haircut',
                    startTime: '08:15 AM',
                    endTime: '10:15 AM',
                    endDate: '20170101',
                },
                {
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


const dates = [
    { id: 1, date: new Date(2017, 1, 1), 
        events: 
        [
            { time: new Date(2017, 1, 1, 15, 45, 0, 0), icon: "meeting-icon-url", text: "3:45 meeting 😒😒\nRed conference room" },
            { time: new Date(2017, 1, 1, 11, 30, 0, 0), icon: "lunch-icon-url", text: "Lunch! 😁"}
        ]
    },
    { id: 2, date: new Date(2016, 12, 31),
        events: []
    }
];

let maxDate = 2;

const icon = "test-icon-url";

class CalendarApi {
    static loadCalendar(userId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({...calendar});
            }, delay);
        });
    }

    static loadDateRange(startDate, endDate, calId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([...(dates.filter(item => item.date.getTime() >= startDate.getTime() && item.date.getTime() <= endDate.getTime()))]);
            }, delay);
        });
    }

    static insertDate(date, calId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({...date, id: maxDate++});
            }, delay);
        });
    }

    static updateDate(date, calId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({...date});
            }, delay);
        });
    }

    static deleteDate(dateId, calId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(dateId);
            }, delay);
        });
    }

    static loadDateIcon(dateId, calId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(icon);
            }, delay);
        });
    }
    
    static updateDateIcon(icon, dateId, calId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(dateId);
            }, delay);
        });
    }
}

export default CalendarApi;
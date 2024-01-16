import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/he'; // Import Hebrew locale
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux'

const localizer = momentLocalizer(moment);

const messages = {
    allDay: 'כל היום',
    previous: 'הקודם',
    next: 'הבא',
    today: 'היום',
    month: 'חודש',
    week: 'שבוע',
    day: 'יום',
    agenda: 'סדר יום',
    date: 'תאריך',
    time: 'זמן',
    event: 'אירוע',
};

const CalendarView = ({ events }) => {

    const userInfo = useSelector((myStore) =>
        myStore.userInfoSlice
    )

    const nav = useNavigate()

    const eventList = events.map((event) => ({
        title: event.event_name,
        start: new Date(event.date_and_time),
        end: new Date(event.date_and_time),
        _id: event._id
    }));

    const onSelectEvent = (event) => {
        localStorage.setItem("eventId", event._id);

        if (userInfo.user.role == "admin") {
            nav("/admin/events/eventCard",
                {
                    state: {
                        event: event
                    }
                })
        }
        else {
            console.log(event)
            nav("/user/events/eventCard", {
                state: {
                    event: event
                }
            })

        }
    };

    return (
        <div className='pt-5'>
            <div className="calendar-container">
                <Calendar
                    localizer={localizer}
                    events={eventList}
                    startAccessor="start"
                    endAccessor="end"
                    views={['month']}
                    defaultDate={new Date()}
                    style={{ height: '500px' }}
                    messages={messages}
                    onSelectEvent={onSelectEvent} 
                />
            </div>
        </div>
    );
};

export default CalendarView;

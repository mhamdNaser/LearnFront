import React, { useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addHours } from "date-fns"; // Import this to handle adding hours
import addMinutes from "date-fns/addMinutes";
import { useStateContext } from "../contexts/ContextsProvider";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function Appointment() {
  const { user } = useStateContext();
  const [newEvent, setNewEvent] = useState({
    title: user?.id,
    start: new Date(),
    end: addHours(new Date(), 1), // Set default end time to 1 hour ahead
  });
  const [allEvent, setAllEvent] = useState([]);

  const handleAddEvent = () => {
    setNewEvent({
      start: new Date(),
      end: addMinutes(new Date(), 30), // Reset to default values after adding
    });
    setAllEvent([...allEvent, newEvent]);
  };

  useEffect(() => {
    allEvent.forEach((ele) => {
      console.log(ele.start);
      console.log(ele.end);
    });
  }, [allEvent]);

  return (
    <div className="d-flex vh-100 justify-content-center">
      <div>
        <input
          type="text"
          placeholder="Add Title"
          value={newEvent.title}
          onChange={(ev) =>
            setNewEvent({ ...newEvent, title: ev.target.value })
          }
        />
        <DatePicker
          showTimeSelect
          placeholderText="Start Date and Time"
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
          dateFormat="MM/dd/yyyy h:mm"
        />
        <button onClick={handleAddEvent}>Add Event</button>
        <Calendar
          localizer={localizer}
          events={allEvent}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    </div>
  );
}

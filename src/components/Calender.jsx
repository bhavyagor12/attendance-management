import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";
moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function Calender() {
  const [eventsData, setEventsData] = useState(events);
  const handleClick = (event) => {
    alert(event.title);
  };
  const handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title)
      setEventsData([
        ...eventsData,
        {
          title,
          start,
          end,
        },
      ]);
  };
  return (
    <div className="flex flex-col ">
      <div className="flex items-center justify-center mb-4">
        <button
          className="bg-[#AA5656] text-[#F1DBBF] font-[Poppins] py-2 px-8 mx-2 rounded  hover:bg-[#F1DBBF] hover:text-[#AA5656] duration-500"
          onClick={handleSelect}
        >
          Add Lecture
        </button>
      </div>
      <Calendar
        views={["day", "week"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="week"
        startAccessor="start"
        endAccessor="end"
        events={eventsData}
        style={{ height: "80vh", width: "80vw", padding: 10 }}
        onSelectEvent={(e) => {
          handleClick(e);
        }}
        onSelectSlot={handleSelect}
      />
    </div>
  );
}

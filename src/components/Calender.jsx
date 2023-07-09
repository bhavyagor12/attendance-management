import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { modalState } from "../atoms/modalState";
import { useRecoilState } from "recoil";
import EventModal from "./EventModal";
import { eventState } from "../atoms/eventState";
import { useNavigate } from "react-router-dom";
moment.locale("en_IN");
const localizer = momentLocalizer(moment);

export default function Calender() {
  const navigate = useNavigate();
  const [eventsData, setEventsData] = useRecoilState(eventState);
  const [modal, setModal] = useRecoilState(modalState);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const handleClick = (event) => {
    navigate(`/lecture/${event.id}`);
  };
  const onButtonClick = () => {
    setStartTime(null);
    setEndTime(null);
    setModal(true);
  };
  const handleSelect = ({ start, end }) => {
    // console.log(start, end)
    setStartTime(start);
    setEndTime(end);
    setModal(true);
  };
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center mb-4">
        <button
          className="bg-[#AA5656] text-[#F1DBBF] font-[Poppins] py-2 px-8 mx-2 rounded  hover:bg-[#F1DBBF] hover:text-[#AA5656] duration-500"
          onClick={() => {
            onButtonClick();
          }}
        >
          Add Lecture
        </button>
      </div>
      {modal ? <EventModal startD={startTime} endD={endTime} /> : null}
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

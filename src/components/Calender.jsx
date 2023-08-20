import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { modalState } from "../atoms/modalState";
import { useRecoilState, useRecoilValue } from "recoil";
import EventModal from "./EventModal";
import { eventState } from "../atoms/eventState";
import { useNavigate } from "react-router-dom";
import { createLecture } from "../utils/services";
import { infoState } from "../atoms/infoState";
import { timeHelperBachaLe } from "../utils/helpers";
moment.locale("en_IN");
const localizer = momentLocalizer(moment);

const eventPropGetter = (event) => {
  if (event?.type === undefined) {
    return {
      style: {
        backgroundColor: "#34313197",
      },
    };
  }
  const color = event.type === "theory" ? "#AA5656" : "#0080FB";
  return {
    style: {
      backgroundColor: color,
    },
  };
};

export default function Calender() {
  const userInfo = useRecoilValue(infoState);
  const navigate = useNavigate();
  const [eventsData, setEventsData] = useRecoilState(eventState);
  const [modal, setModal] = useRecoilState(modalState);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const handleClick = async (event) => {
    if (event.type === "theory" || event.type === "practical") {
      console.log(event);
      // const startDate = timeHelperBachaLe(event.start.getTime());
      // const endDate = timeHelperBachaLe(event.end.getTime());
      // const lecture = {
      //   date_of_lecture: startDate,
      //   start_time: startDate,
      //   end_time: endDate,
      //   subject_code: event.id,
      //   faculty_id: userInfo.ID,
      //   division: event.division,
      //   batch: event.batch,
      // };
      // const l = await createLecture(lecture);
      // navigate(`/lecture/${l.ID}`, {
      //   state: { lectureId: `${l.ID}` },
      // });
      return;
    }
    // navigate(`/lecture/${event.id}`, {
    //   state: { lectureId: `${event.id}` },
    // });
  };
  // const onButtonClick = () => {
  //   setStartTime(null);
  //   setEndTime(null);
  //   setModal(true);
  // };
  const handleSelect = ({ start, end }) => {
    // console.log(start, end)
    setStartTime(start);
    setEndTime(end);
    setModal(true);
  };
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center mb-4">
        {/* <button
          className="bg-[#AA5656] text-[#F1DBBF] font-[Poppins] py-2 px-8 mx-2 rounded  hover:bg-[#F1DBBF] hover:text-[#AA5656] duration-500"
          onClick={() => {
            onButtonClick();
          }}
        >
          Add Lecture
        </button> */}
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
          console.log(e);
          handleClick(e);
        }}
        onSelectSlot={handleSelect}
        eventPropGetter={eventPropGetter}
      />
    </div>
  );
}

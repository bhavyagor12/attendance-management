import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { modalState } from "../atoms/modalState";
import { useRecoilState, useRecoilValue } from "recoil";
import EventModal from "./EventModal";
import { useNavigate } from "react-router-dom";
import { createLecture } from "../utils/services";
import { infoState } from "../atoms/infoState";
import { timeHelperBachaLe } from "../utils/helpers";
import { classInfoState } from "../atoms/classInfoState";
import { getAllLectures } from "../utils/services";
import { timeTableEventsHelper } from "../utils/helpers";

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
  const [modal, setModal] = useRecoilState(modalState);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [classInfo, setClassInfo] = useRecoilState(classInfoState);
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  function combineEventsAndLectures(events, lectures) {
    const combinedArray = [...lectures];
    events.forEach((event) => {
      const matchingLecture = lectures.find(
        (lecture) =>
          lecture.start.toISOString() === event.start.toISOString() &&
          lecture.end.toISOString() === event.end.toISOString()
      );

      if (!matchingLecture) {
        combinedArray.push(event);
      }
    });

    return combinedArray;
  }
  const initTT = async (currDate) => {
    const lecs = await getAllLectures();
    const events = await timeTableEventsHelper(userInfo.ID, currDate);
    let lecsPlusEvents = combineEventsAndLectures(events, lecs);
    setEventsData(lecsPlusEvents);
  };

  useEffect(() => {
    const today = new Date();
    if (userInfo === null) return;
    initTT(today);
  }, [userInfo]);
  useEffect(() => {
    if (eventsData.length !== 0) {
      setLoading(false);
    }
  }, [eventsData]);

  const handleClick = async (event) => {
    setClassInfo({
      year: event.year,
      division: event.division,
      batch: event.batch,
    });
    if (event.type === "theory" || event.type === "practical") {
      const startDate = timeHelperBachaLe(event.start.getTime());
      const endDate = timeHelperBachaLe(event.end.getTime());
      const lecture = {
        date_of_lecture: startDate,
        start_time: startDate,
        end_time: endDate,
        subject_code: event.id,
        faculty_id: userInfo.ID,
        division: event.division,
        batch: event.batch,
        type: event.type,
        year: event.year,
      };
      const l = await createLecture(lecture);
      navigate(`/lecture/${l.ID}`, {
        state: { lectureId: `${l.ID}` },
      });

      return;
    }
    navigate(`/lecture/${event.id}`, {
      state: { lectureId: `${event.id}` },
    });
  };
  const handleSelect = ({ start, end }) => {
    setStartTime(start);
    setEndTime(end);
    setModal(true);
  };
  return (
    <div className="flex flex-col">
      {modal ? <EventModal startD={startTime} endD={endTime} /> : null}
      {!loading && (
        <Calendar
          views={["day", "week"]}
          onNavigate={async (newDate) => {

            await initTT(newDate);
          }}
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
          eventPropGetter={eventPropGetter}
        />
      )}
    </div>
  );
}

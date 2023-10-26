import React, { useState, useEffect } from "react";
import { momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { modalState } from "../atoms/modalState";
import { useRecoilState, useRecoilValue } from "recoil";
import EventModal from "./EventModal";
import { useNavigate } from "react-router-dom";
import { createLecture } from "../utils/services";
import { infoState } from "../atoms/infoState";
import {
  combineEventsAndLectures,
  eventPropGetter,
  makeEventForCreateLecture,
} from "../utils/helpers";
import { classInfoState } from "../atoms/classInfoState";
import { getAllLectures } from "../utils/services";
import { timeTableEventsHelper } from "../utils/helpers";
import CalendarComponent from "./CalendarComponent";

moment.locale("en_IN");
const localizer = momentLocalizer(moment);

export default function Calender({ view }) {
  const userInfo = useRecoilValue(infoState);
  const navigate = useNavigate();
  const [modal, setModal] = useRecoilState(modalState);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [classInfo, setClassInfo] = useRecoilState(classInfoState);
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const initTT = async (currDate) => {
    const lecs = await getAllLectures(userInfo.ID);
    const events = await timeTableEventsHelper(userInfo.ID, currDate);
    let lecsPlusEvents = combineEventsAndLectures(events, lecs);
    setEventsData(lecsPlusEvents);
  };

  useEffect(() => {
    if (userInfo === null) return;
    const today = new Date();
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
      const lecture = makeEventForCreateLecture(event, userInfo.ID);
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
        <CalendarComponent
          eventsData={eventsData}
          view={view}
          localizer={localizer}
          initTT={initTT}
          handleClick={handleClick}
          handleSelect={handleSelect}
          eventPropGetter={eventPropGetter}
        />
      )}
    </div>
  );
}

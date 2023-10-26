import React, { useState, useEffect, useRef } from "react";
import { Calendar, momentLocalizer, Navigate } from "react-big-calendar";
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

moment.locale("en_IN");
const localizer = momentLocalizer(moment);

class CustomToolbar extends React.Component {
  render() {
    return (
      <div className="rbc-toolbar flex flex-col sm:flex-row gap-2 lg:gap-0">
        <span className="rbc-btn-group">
          <button type="button" onClick={() => this.navigate(Navigate.TODAY)}>
            Today
          </button>
          <button
            type="button"
            onClick={() => this.navigate(Navigate.PREVIOUS)}
          >
            Back
          </button>
          <button type="button" onClick={() => this.navigate(Navigate.NEXT)}>
            Next
          </button>
        </span>
        <span className="rbc-toolbar-label">{this.props.label}</span>
        <span className="rbc-btn-group">{this.viewNamesGroup()}</span>
      </div>
    );
  }

  navigate = (action) => {
    this.props.onNavigate(action);
  };

  view = (view) => {
    this.props.onView(view);
  };

  viewNamesGroup() {
    let viewNames = this.props.views;
    const view = this.props.view;

    if (viewNames.length > 1) {
      return viewNames.map((name) => (
        <button
          type="button"
          key={name}
          className={view === name ? "rbc-active" : ""}
          onClick={this.view.bind(null, name)}
        >
          {name}
        </button>
      ));
    }
  }
}

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
        <Calendar
          components={{
            toolbar: CustomToolbar,
          }}
          views={["day", "week"]}
          onNavigate={async (newDate) => {
            await initTT(newDate);
          }}
          view={view}
          selectable
          localizer={localizer}
          defaultDate={new Date()}
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

import React from "react";
import { Calendar, Navigate } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const CustomToolbar = ({ label, onNavigate, onView, views, view }) => {
  const navigate = (action) => {
    onNavigate(action);
  };

  const viewNamesGroup = () => {
    if (views.length > 1) {
      return views.map((name) => (
        <button
          type="button"
          key={name}
          className={view === name ? "rbc-active" : ""}
          onClick={() => onView(name)}
        >
          {name}
        </button>
      ));
    }
  };

  return (
    <div className="rbc-toolbar flex flex-col sm:flex-row gap-2 lg:gap-0">
      <span className="rbc-btn-group">
        <button type="button" onClick={() => navigate(Navigate.TODAY)}>
          Today
        </button>
        <button type="button" onClick={() => navigate(Navigate.PREVIOUS)}>
          Back
        </button>
        <button type="button" onClick={() => navigate(Navigate.NEXT)}>
          Next
        </button>
      </span>
      <span className="rbc-toolbar-label">{label}</span>
      <span className="rbc-btn-group">{viewNamesGroup()}</span>
    </div>
  );
};

const CalendarComponent = ({
  eventsData,
  view,
  localizer,
  initTT,
  handleClick,
  handleSelect,
  eventPropGetter,
}) => {
  return (
    <>
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
    </>
  );
};

export default CalendarComponent;

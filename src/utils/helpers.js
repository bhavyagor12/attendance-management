import { getTimeTable } from "./services";

export function _getTimeZoneOffsetInMs() {
  return new Date().getTimezoneOffset() * -60 * 1000;
}

export const getCsvSapIds = (csvData) => {
  const extractedSapIds = csvData
    .map((innerArray) => {
      const value = innerArray[0];
      return value !== "" ? parseInt(value, 10) : null;
    })
    .filter((value) => value !== null);
  return extractedSapIds;
};

export function timestampToDatetimeInputString(timestamp, item) {
  if (item === "start") {
    const date = new Date(timestamp + _getTimeZoneOffsetInMs());
    return date.toISOString().slice(0, 16);
  } else {
    const date = new Date(
      timestamp + _getTimeZoneOffsetInMs() + 1 * (60 * 60 * 1000)
    );
    return date.toISOString().slice(0, 16);
  }
}

export function timeHelperBachaLe(timestamp) {
  const date = new Date(timestamp + _getTimeZoneOffsetInMs());
  return date.toISOString().slice(0, 16);
}

export function getDaysDateTime(day, time, currDate) {
  const mapDayToNumber = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };
  day = mapDayToNumber[day.toLowerCase()];
  const today = currDate;
  const currentDayOfWeek = today.getDay(); // Sunday is 0, Monday is 1, and so on.
  const daysUntilDay =
    currentDayOfWeek === day - 1 ? 1 : day - currentDayOfWeek;
  // Calculate the date of Monday by subtracting the number of days from today.
  const dayDate = new Date(today);
  dayDate.setDate(today.getDate() + daysUntilDay);
  const date = new Date(dayDate.toDateString() + " " + time);
  return date;
}
export async function timeTableEventsHelper(facultyID, currDate) {
  const ttevents = await getTimeTable(facultyID);

  let events = [];
  ttevents?.map((ttevent) => {
    const id = ttevent.subject_code;
    let title = `${ttevent.subject_name} ${ttevent.division}`;
    if (ttevent.type === "practical") {
      title += ` B(${ttevent.batch})`;
    }
    const start = getDaysDateTime(ttevent.day, ttevent.start_time, currDate);
    const end = getDaysDateTime(ttevent.day, ttevent.end_time, currDate);
    const type = ttevent.type;
    const batch = ttevent.batch;
    const division = ttevent.division;
    const year = ttevent.year;
    const event = {
      id,
      title,
      start,
      end,
      type,
      batch,
      division,
      year,
    };
    events.push(event);
  });
  return events;
}

export const getStudentArray = (data) => {
  let initialStudents = [];
  initialStudents = data?.map((student) => {
    return {
      sapid: student.sap_id,
      name: student.name,
    };
  });
  return initialStudents;
};

export function combineEventsAndLectures(events, lectures) {
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

export const eventPropGetter = (event) => {
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

export const makeEventForCreateLecture = (event, faculty_id) => {
  const startDate = timeHelperBachaLe(event.start.getTime());
  const endDate = timeHelperBachaLe(event.end.getTime());
  const lecture = {
    date_of_lecture: startDate,
    start_time: startDate,
    end_time: endDate,
    subject_code: event.id,
    faculty_id: faculty_id,
    division: event.division,
    batch: event.batch,
    type: event.type,
    year: event.year,
  };
  return lecture;
};

export const getTwoDecimals = (number) => {
  return parseFloat(number.toFixed(2));
};

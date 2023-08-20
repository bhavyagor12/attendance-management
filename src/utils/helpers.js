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
  console.log(extractedSapIds);
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

export function getDaysDateTime(day, time) {
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
  const today = new Date();
  const currentDayOfWeek = today.getDay(); // Sunday is 0, Monday is 1, and so on.
  const daysUntilDay =
    currentDayOfWeek === day - 1 ? 1 : day - currentDayOfWeek;
  console.log(day)
  // Calculate the date of Monday by subtracting the number of days from today.
  const dayDate = new Date(today);
  dayDate.setDate(today.getDate() + daysUntilDay);
  const date = new Date(dayDate.toDateString() + " " + time);
  // console.log(date);
  // console.log(dayDate.toDateString());
  return date;
}
export async function timeTableEventsHelper(facultyID) {
  const ttevents = await getTimeTable(facultyID);
  let events = [];
  ttevents?.map((ttevent) => {
    const id = ttevent.subject_code;
    const title = ttevent.subject_name;
    const start = getDaysDateTime(ttevent.day, ttevent.start_time);
    const end = getDaysDateTime(ttevent.day, ttevent.end_time);
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


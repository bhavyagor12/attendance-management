import Swal from "sweetalert2";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const LOGIN_URL = BASE_URL + "/login";
const GET_SUBJECTS_BY_FACULTY = BASE_URL + "/getSubjectsbyFaculty";
const REGISTER_URL = BASE_URL + "/register";
const GET_LECTURES_BY_FACULTY = BASE_URL + "/getLecturesByFaculty";
const LECTURE_URL = BASE_URL + "/lecture";
const GET_LECTURES_BY_SUBJECT = BASE_URL + "/getLecturesBySubject";
const MARK_ATTENDANCE = BASE_URL + "/markAttendance";
const DELETE_LECTURE = BASE_URL + "/lecture";
const TIMETABE_ENTRY = BASE_URL + "/getAllTimeTableEntries";
const GET_ALL_STUDENTS = BASE_URL + "/getAllStudents";
const GET_STUDENTS_BY_SUBJECT = BASE_URL + "/getAllStudentsBySubject";

export const Login = async (userData) => {
  try {
    const response = await axios.post(LOGIN_URL, userData, {
      withCredentials: true,
    });
    const content = await response.data;
    let info = null;
    if (content !== "AuthError") {
      info = {
        sap_id: content.sap_id,
        name: content.name,
        ID: content.ID,
      };
    } else {
      Swal.fire({
        title: "Error!",
        text: "Entered credentials dont exist",
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
    return info;
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Error!",
      text: error,
      icon: "error",
      confirmButtonText: "Retry",
    });
  }
};

export const getSubjectsByFaculty = async (facultyID) => {
  const url = GET_SUBJECTS_BY_FACULTY + `/${facultyID}`;
  try {
    const response = await axios.get(url, {
      withCredentials: true,
    });
    const subjects = await response.data;
    return subjects;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const Register = async (teacherData) => {
  try {
    const response = await axios.post(REGISTER_URL, teacherData, {
      withCredentials: true,
    });
    const content = await response.data;
    let info = null;
    if (content !== "AuthError") {
      info = {
        sap_id: content.sap_id,
        name: content.name,
        ID: content.password,
      };
      Swal.fire({
        title: "Success!",
        text: "Registered Successfully",
        icon: "success",
        confirmButtonText: "Proceed!",
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Entered credentials dont exist",
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
    return info;
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Error!",
      text: "internal error",
      icon: "error",
      confirmButtonText: "Retry",
    });
  }
};

export const getAllLectures = async (facultyId) => {
  let updatedEventsData = [];
  const url = GET_LECTURES_BY_FACULTY + `/${facultyId}`;
  try {
    const response = await axios.get(url, {
      withCredentials: true,
    });
    const allLectures = response.data;

    allLectures.forEach((lecture) => {
      if (lecture.start_time) {
        const start_time = lecture.start_time;
        const end_time = lecture.end_time;
        const title = lecture.subject.name;
        const id = lecture.ID;
        const division = lecture.division;
        const batch = lecture.batch;
        const year = lecture.subject.year;
        // Create a new event object using the lecture details
        const newEvent = {
          id: id,
          title: title,
          start: new Date(start_time),
          end: new Date(end_time),
          division: division,
          batch: batch,
          year: year,
        };
        // Add the new event to the updatedEventsData array
        updatedEventsData.push(newEvent);
      }
    }); // Check the updated eventsData array with lectures added
  } catch (error) {
    console.error("Error fetching lectures:", error);
  }
  return updatedEventsData;
};

export const createLecture = async (lecture) => {
  try {
    const response = await axios.post(LECTURE_URL, JSON.stringify(lecture), {
      withCredentials: true,
    });
    const content = await response.data;
    return content;
  } catch (error) {
    console.log(error);
  }
};

export const getLecturesBySubject = async (subjectID) => {
  const url = GET_LECTURES_BY_SUBJECT + `/${subjectID}`;
  try {
    const res = await axios.get(url, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const markLectureAttendance = async (
  lectureId,
  stundentArr,
  subjectCode
) => {
  try {
    const res = await axios.put(
      MARK_ATTENDANCE,
      {
        lecture_id: lectureId || "",
        attendance: stundentArr,
        subject_code: subjectCode || "",
      },
      { withCredentials: true }
    );
    if (res.status === 200) {
      Swal.fire({
        title: "Success!",
        text: "Marked Attendance",
        icon: "success",
        confirmButtonText: "Done",
      });
    } else {
      Swal.fire({
        title: "Failure!",
        text: "Some error",
        icon: "error",
        confirmButtonText: "retry",
      });
    }
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteLecture = async (lectureId) => {
  const url = DELETE_LECTURE + `/${lectureId}`;
  try {
    const response = await axios.delete(url, { withCredentials: true });
    console.log(response);
    if (response.status === 200) {
      console.log("Lecture deleted successfully");
      Swal.fire({
        title: "Success!",
        text: "Lecture Deleted",
        icon: "success",
        confirmButtonText: "Done",
      });
      window.location.reload(false);
      return true;
    } else {
      console.log("Failed to delete lecture");
      Swal.fire({
        title: "Failure!",
        text: "Some error",
        icon: "error",
        confirmButtonText: "retry",
      });
      return false;
    }
  } catch (error) {
    console.log("Error occurred:", error);
    return false;
  }
};

export const getTimeTable = async (facultyID) => {
  const url = TIMETABE_ENTRY + `/${facultyID}`;
  try {
    const res = await axios.get(url, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getStudentsbyClassInfo = async (classInfo) => {
  const url =
    GET_ALL_STUDENTS +
    `?year=${classInfo.year}&division=${classInfo.division}&batch=${classInfo.batch}`;
  try {
    const response = await axios.get(url, { withCredentials: true });

    const content = response.data;
    return content;
  } catch (error) {
    console.log(error);
  }
};

export const getLectureById = async (lectureId) => {
  const url = LECTURE_URL + `/${lectureId}`;
  try {
    const response = await axios.get(url, { withCredentials: true });
    const content = response.data;
    return content;
  } catch (error) {
    console.log(error);
  }
};

export const getLectureAttendance = async (lectureId) => {
  try {
    const getLectureAttendanceUrl =
      BASE_URL + `/getLectureAttendance/${lectureId}`;

    const response = await axios.get(getLectureAttendanceUrl, {
      withCredentials: true,
    });

    const content = response.data;
    return content;
  } catch (error) {
    console.log(error);
  }
};

export const getStudentsbySubject = async (
  classInfo,
  subjectCode,
  lecture_id
) => {
  const url =
    GET_STUDENTS_BY_SUBJECT +
    `/${subjectCode}?year=${classInfo.year}&division=${classInfo.division}&batch=${classInfo.batch}&lecture_id=${lecture_id}`;
  try {
    const response = await axios.get(url, { withCredentials: true });

    const content = response.data;
    return content;
  } catch (error) {
    console.log(error);
  }
};

export const getClassAttendance = async (classInfo) => {
  const url = BASE_URL + `/getClassAttendance`;
  try {
    const response = await axios.post(url, JSON.stringify(classInfo), {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  const url = BASE_URL + `/logout`;
  try {
    const rawResponse = await axios.get(url, {
      withCredentials: true,
    });
    return rawResponse;
  } catch (error) {
    return error;
  }
};

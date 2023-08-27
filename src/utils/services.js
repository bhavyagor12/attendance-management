import Swal from "sweetalert2";
import axios from "axios";

const BASE_URL = `http://localhost:9000/`;

export const Login = async (userData) => {
  try {
    const response = await axios.post("http://localhost:9000/login", userData, {
      withCredentials: true,
    });
    console.log(response.headers);
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

export const Register = async (teacherData) => {
  try {
    const response = await axios.post(
      "http://localhost:9000/register",
      teacherData,
      { withCredentials: true }
    );
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
  try {
    const response = await axios.get(
      `http://localhost:9000/getLecturesByFaculty/${facultyId}`,
      { withCredentials: true }
    );
    const allLectures = response.data;
    // Initialize as an empty array to clear existing events
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

export const getSubjectsByFaculty = async (facultyID) => {
  try {
    const response = await axios.get(
      `http://localhost:9000/getSubjectsbyFaculty/${facultyID}`,
      { withCredentials: true }
    );
    const subjects = await response.data;
    return subjects;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createLecture = async (lecture) => {
  try {
    const response = await axios.post(
      "http://localhost:9000/lecture",
      JSON.stringify(lecture),
      { withCredentials: true }
    );
    const content = await response.data;
    return content;
  } catch (error) {
    console.log(error);
  }
};

export const getLecturesBySubject = async (subjectID) => {
  try {
    const res = await axios.get(
      `http://localhost:9000/getLecturesBySubject/${subjectID}`,
      { withCredentials: true }
    );
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
      "http://localhost:9000/markAttendance",
      {
        lecture_id: lectureId || "",
        attendance: stundentArr,
        subject_code: subjectCode || "",
      },
      { withCredentials: true }
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteLecture = async (lectureId) => {
  try {
    const response = await axios.delete(
      `http://localhost:9000/lecture/${lectureId}`,
      { withCredentials: true }
    );
    console.log(response);
    if (response.status === 200) {
      console.log("Lecture deleted successfully");
      Swal.fire({
        title: "Success!",
        text: "Lecture Deleted",
        icon: "success",
        confirmButtonText: "Done",
      });
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
  try {
    const res = await axios.get(
      `http://localhost:9000/getAllTimeTableEntries/${facultyID}`,
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getStudentsbyClassInfo = async (classInfo) => {
  try {
    let apiUrl = `http://localhost:9000/getAllStudents?year=${classInfo.year}&division=${classInfo.division}&batch=${classInfo.batch}`;
    // apiUrl = `http://localhost:9000/getAllStudents`;
    const response = await axios.get(apiUrl, { withCredentials: true });

    const content = response.data;
    return content;
  } catch (error) {
    console.log(error);
  }
};

export const getStudentsbySubject = async (classInfo, subjectCode) => {
  try {
    let apiUrl = `http://localhost:9000/getAllStudentsBySubject/${subjectCode}?year=${classInfo.year}&division=${classInfo.division}&batch=${classInfo.batch}`;
    // apiUrl = `http://localhost:9000/getAllStudents`;
    const response = await axios.get(apiUrl, { withCredentials: true });

    const content = response.data;
    return content;
  } catch (error) {
    console.log(error);
  }
};

export const getLectureById = async (lectureId) => {
  try {
    const apiUrl = `http://localhost:9000/lecture/${lectureId}`;

    const response = await axios.get(apiUrl, { withCredentials: true });

    const content = response.data;
    return content;
  } catch (error) {
    console.log(error);
  }
};

export const getLectureAttendance = async (lectureId) => {
  try {
    const getLectureAttendanceUrl =
      BASE_URL + `getLectureAttendance/${lectureId}`;

    const response = await axios.post(getLectureAttendanceUrl, {
      withCredentials: true,
    });

    const content = response.data;
    return content;
  } catch (error) {
    console.log(error);
  }
};

export const getClassAttendance = async (classInfo) => {
  try {
    let apiUrl = "http://localhost:9000/getClassAttendance";

    const response = await axios.post(apiUrl, JSON.stringify(classInfo), {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    const rawResponse = await axios.get("http://localhost:9000/logout", {
      withCredentials: true,
    });
    return rawResponse;
  } catch (error) {
    return error;
  }
};

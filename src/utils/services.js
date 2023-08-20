import Swal from "sweetalert2";
import axios from "axios";

export const Login = async (userData) => {
  try {
    const response = await axios.post("http://localhost:9000/login", userData);
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
      text: "internal error",
      icon: "error",
      confirmButtonText: "Retry",
    });
  }
};

export const Register = async (teacherData) => {
  try {
    const response = await axios.post(
      "http://localhost:9000/register",
      teacherData
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

export const getAllLectures = async () => {
  let updatedEventsData = [];
  try {
    const response = await axios.get("http://localhost:9000/getAllLectures");
    const allLectures = response.data;
    console.log(allLectures);
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
      `http://localhost:9000/getSubjectbyFacultyID/${facultyID}`
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
      JSON.stringify(lecture)
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
      `http://localhost:9000/getLecturesBySubject/${subjectID}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const markLectureAttendance = async (lectureId, stundentArr) => {
  try {
    const res = await axios.put("http://localhost:9000/markAttendance", {
      lecture_id: lectureId || "",
      attendance: stundentArr,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteLecture = async (lectureId) => {
  try {
    const response = await fetch(`http://localhost:9000/lecture/${lectureId}`, {
      method: "DELETE",
    });

    if (response.ok) {
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
      `http://localhost:9000/getAllTimeTableEntries/${facultyID}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getStudentsbyClassInfo = async (classInfo) => {
  try {
    let fetchMethod = "GET",
        apiUrl = `http://localhost:9000/getAllStudents?year=${classInfo.year}&division=${classInfo.division}&batch=${classInfo.batch}`
        // apiUrl = `http://localhost:9000/getAllStudents`;
    const response = await axios({
      method: fetchMethod,
      url: apiUrl,
    });

    const content = response.data;
    return content;
  } catch (error) {
    console.log(error);
  }
};

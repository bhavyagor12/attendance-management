import Swal from "sweetalert2";
import axios from "axios";

export const Login = async (userData) => {
  try {
    const response= await axios.post("http://localhost:9000/login",userData)
    const content = await response.data;
    let info=null
    if (content!=="AuthError") {
        info=({
        sap_id: content.sap_id,
        name: content.name,
        ID: content.ID,
      });
    }
    else {
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
        // Create a new event object using the lecture details
        const newEvent = {
          id: id,
          title: title,
          start: new Date(start_time),
          end: new Date(end_time),
        };
        // Add the new event to the updatedEventsData array
        updatedEventsData.push(newEvent);
      }
    });// Check the updated eventsData array with lectures added
  } catch (error) {
    console.error("Error fetching lectures:", error);
  }
  return updatedEventsData 
};

export const getSubjectsByFaculty = async (facultyID) => {
  try {
    const response = await axios.get(`http://localhost:9000/getSubjectbyFacultyID/${facultyID}`);
    const subjects = await response.data;
    return subjects;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const createLecture = async (lecture) => {
  try {
    const response= await axios.post("http://localhost:9000/lecture",JSON.stringify(lecture))
    const content = await response.data;
    console.log(content);
  } catch (error) {
    console.log(error);
  }
}

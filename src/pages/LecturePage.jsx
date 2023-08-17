import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Nav from "../components/Navbar";
import { TiTick } from "react-icons/ti";
import Papa from "../components/Papa.js";
import { useLocation } from "react-router-dom";
import AttendanceTable from "../components/AttendanceTable";

const MarkAttendance = () => {
  const [fetchLecture, setFetchLecture] = useState(false);
  const [date, setDate] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [lectureId, setLectureId] = useState("");
  const [type, setType] = useState("");
  const [division, setDivision] = useState("");
  const [batch, setBatch] = useState("");
  const [students, setStudents] = React.useState([]);

  const handleClick = () => {
    setFetchLecture(!fetchLecture);
  };

  const fetchLec = async (e) => {
    e.preventDefault();
    const userData = {
      subject_id: subjectId,
      date_of_lecture: date,
      type,
      division,
      batch: Number(batch),
    };
    try {
      const rawResponse = await fetch("http://localhost:9000/fetchLecture", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const content = await rawResponse.json();
      console.log(content.ID);
      if (content) {
        console.log("going to home");
        // navigate("/home");
      }
      // else if (content.type === "police") {
      //   console.log("going to police");
      // }
    } catch (error) {
      console.log(error);
    }
  };

  let location = useLocation();

  useEffect(() => {
    if (location?.state?.lectureId !== null) {
      setLectureId(location?.state?.lectureId);
    } else {
      setLectureId("1");
    }
  }, [location]);

  return (
    <div>
      <Nav />
      {/* <Banner /> */}
      <Papa lectureId={lectureId} subjectId={subjectId} />
      <div className="max-w-3xl mx-auto text-center pt-4 pb-4 md:pb-4">
        <h1 className="h2 mb-2">Students Table</h1>
        <p className="flex items-center justify-center gap-2 text-sm md:text-xl text-gray-600">
          Here is a list of students,{" "}
          <div className="flex items-center justify-center">
            <span className="font-bold text-gray-900"> Tick</span>
            <TiTick className="text-black" size={25} />
            to mark attendance
          </div>
        </p>
      </div>

      <AttendanceTable />
    </div>
  );
};

export default MarkAttendance;

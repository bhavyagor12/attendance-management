import React, { useEffect, useState } from "react";
import Nav from "../components/Navbar";
import { TiTick } from "react-icons/ti";
import Papa from "../components/Papa.js";
import { useLocation } from "react-router-dom";
import AttendanceTable from "../components/AttendanceTable";
import { Button } from "@mui/material";
import { deleteLecture, getLectureById } from "../utils/services";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const MarkAttendance = () => {
  const [lectureId, setLectureId] = useState("");
  const [lecture, setLecture] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleDeleteLeture = async () => {
    if (deleteLecture(lectureId)) {
      navigate("/home");
    }
  };
  let location = useLocation();

  useEffect(() => {
    if (location?.state?.lectureId !== null) {
      setLectureId(location?.state?.lectureId);
      getLectureById(location?.state?.lectureId).then((res) => {
        setLecture(res);
        console.log(res)
      }).catch((err) => {
        console.log(err)
      });
    } else {
      setLectureId("1");
    }
  }, [location]);

  useEffect(() => {
    if (lecture?.subject_code && lecture?.subject_code !== "") {
      setLoading(false);
    }
  }, [lecture])

  return (
    <div>
      <Nav />
      <Papa lectureId={lectureId} />
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
      <Button
        onClick={handleDeleteLeture}
        variant="contained"
        sx={{ backgroundColor: "red", margin: "1rem" }}
      >
        Delete Lecture
      </Button>
      {!loading && <AttendanceTable subjectCode={lecture.subject_code}/>}
    </div>
  );
};

export default MarkAttendance;

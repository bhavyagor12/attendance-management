import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LectureCard = ({date,division,type,batch,ID}) => {
  const [attendance, setAttendance] = React.useState([]);
  const navigate = useNavigate();
  const lectureID = ID;
  console.log(lectureID);
  const handleClick = () => {
    navigate(`/markAttendance/${lectureID}`, {
      state: { lectureId: `${lectureID}` },
    });
  }
  const fetchAttendance = async () => {
    // e.preventDefault();
    try {
      const rawResponse = await fetch(`http://localhost:9000/getLectureAttendance/${lectureID}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(userData),
      });
      const content = await rawResponse.json();
      console.log(content.map((student) => student.attendance));
      setAttendance(content.map((student) => student.attendance));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAttendance();
  }, []);
  return (
    <div onClick={handleClick}>
      <div className=" flex py-8  border rounded-lg shadow bg-gray-800 border-gray-700">
        <div className="mx-4">
          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-white ">
            Date : {Date(date).slice(0, 15)}
          </h5>
          <h4 className="mb-2 text-2xl font-semibold tracking-tight text-white ">
            Division : {division} Batch : {batch}
          </h4>
        </div>
        <div className=" px-8 mx-4">
          <p className="font-normal text-gray-300 w-[100%] ">Type: {type} </p>
          <p className="font-normal text-gray-300 ">Students attended: {attendance.length} </p>
        </div>
      </div>
    </div>
  );
};

export default LectureCard;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LectureCard = ({
  date,
  division,
  type,
  batch,
  ID,
  startTime,
  endTime,
}) => {
  const [attendance, setAttendance] = React.useState([]);
  const [datte, setDatte] = React.useState(null);
  const [sTime, setsTime] = React.useState(null);
  const [eTime, seteTime] = React.useState(null);
  const navigate = useNavigate();
  const lectureID = ID;
  console.log(lectureID);
  const handleClick = () => {
    navigate(`/lecture/${lectureID}`, {
      state: { lectureId: `${lectureID}` },
    });
  };
  const fetchAttendance = async () => {
    // e.preventDefault();
    try {
      const rawResponse = await fetch(
        `http://localhost:9000/getLectureAttendance/${lectureID}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(userData),
        }
      );
      const content = await rawResponse.json();
      console.log(content.map((student) => student.attendance));
      setAttendance(content.map((student) => student.attendance));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setDatte(new Date(date));
    fetchAttendance();
  }, []);
  return (
    <div onClick={handleClick}>
      <div className=" flex py-8  border rounded-lg shadow bg-gray-800 border-gray-700">
        <div className="mx-4">
          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-white ">
            Date : {datte?.toString().slice(0, 15)}
          </h5>
          <h4 className="mb-2 text-2xl font-semibold tracking-tight text-white flex justify-between">
            <div>Division : {division}</div> <div>Batch : {batch}</div>
          </h4>
        </div>
        <div className=" px-8 mx-4">
          <p className="font-bold text-gray-300 w-[100%] ">Type:</p>
          <p className="font-normal text-gray-300 w-[100%]">{type}</p>
          <p className="font-bold text-gray-300 w-[100%">Students attended: </p>
          <p className="font-normal text-gray-300 w-[100%]">
            {attendance.length}
          </p>
          <p className="font-bold text-gray-300 ">Start Time:</p>
          <p className="font-normal text-gray-300 w-[100%]">
            {" "}
            {startTime && startTime.slice(-5)}{" "}
          </p>
          <p className="font-bold text-gray-300 ">End Time:</p>
          <p className="font-normal text-gray-300 w-[100%]">
            {endTime && endTime.slice(-5)}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LectureCard;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLectureAttendance } from "../utils/services";

const LectureCard = ({
  date,
  division,
  type,
  batch,
  ID,
  startTime,
  endTime,
  year,
}) => {
  const [attendance, setAttendance] = React.useState([]);
  const [datte, setDatte] = React.useState(null);
  const [sTime, setsTime] = React.useState(null);
  const [eTime, seteTime] = React.useState(null);
  const navigate = useNavigate();
  const lectureID = ID;

  const handleClick = () => {
    navigate(`/lecture/${lectureID}`, {
      state: { lectureId: `${lectureID}` },
    });
  };
  const fetchAttendance = async () => {
    // e.preventDefault();
    try {
      // const rawResponse = await fetch(
      //   `http://localhost:9000/getLectureAttendance/${lectureID}`,
      //   {
      //     method: "POST",
      //     headers: {
      //       Accept: "application/json",
      //       "Content-Type": "application/json",
      //     },
      //     // body: JSON.stringify(userData),
      //   }
      // );
      const rawResponse = await getLectureAttendance(lectureID);
      const content = await rawResponse.json();

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
    <div onClick={handleClick} className="w-[360px] h-[250px]">
      <div className="flex justify-around py-4 border rounded-lg shadow bg-gray-800 border-gray-700">
        <div className="">
          <h5 className="mb-2 text-md font-semibold tracking-tight text-white ">
            {datte?.toString().slice(0, 15)}
          </h5>
          <h4 className="mb-2 text-md font-semibold tracking-tight text-white flex justify-between">
            <div>Year : {year}</div>
          </h4>
          <h4 className="mb-2 text-md font-semibold tracking-tight text-white flex justify-between">
            <div>Division : {division}</div>
          </h4>
          <h4 className="mb-2 text-md font-semibold tracking-tight text-white flex justify-between">
            <div>Batch : {batch}</div>
          </h4>
        </div>
        <div className=" px-[1px] mx-4 text-md">
          <div className="flex gap-1 pb-2">
            <p className="font-bold text-gray-300 w-[100%] ">Type:</p>
            <p className="font-normal text-gray-300 w-[100%]">{type}</p>
          </div>
          <div className="flex gap-1 pb-2">
            <p className="font-bold text-gray-300 w-[100%]">Attended: </p>
            <p className="font-normal text-gray-300 w-[100%]">
              {attendance.length}
            </p>
          </div>
          <div className="flex-wrap pb-2">
            <p className="font-normal text-gray-300 w-[100%]">
              {" "}
              {startTime && startTime.slice(-5)} -{" "}
              {endTime && endTime.slice(-5)}{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureCard;

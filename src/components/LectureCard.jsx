import axios from "axios";
import React, { useEffect } from "react";

const LectureCard = ({date,division,type,batch}) => {
  const [attendance, setAttendance] = React.useState([]);
  const fetchAttendance = async () => {
    // e.preventDefault();
    try {
      const rawResponse = await fetch("http://localhost:9000/getLectureAttendance/ea818591-a0b7-4e45-ba14-a2a1c2ecce50", {
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
    <div>
      <div class=" flex py-8  border rounded-lg shadow bg-gray-800 border-gray-700">
        <div className="mx-4">
          <h5 class="mb-2 text-2xl font-semibold tracking-tight text-white ">
            Date : {Date(date).slice(0, 15)}
          </h5>
          <h4 class="mb-2 text-2xl font-semibold tracking-tight text-white ">
            Division : {division} Batch : {batch}
          </h4>
        </div>
        <div className=" px-8 mx-4">
          <p class="font-normal text-gray-300 w-[100%] ">Type: {type} </p>
          <p class="font-normal text-gray-300 ">Students attended: {attendance.length} </p>
        </div>
      </div>
    </div>
  );
};

export default LectureCard;

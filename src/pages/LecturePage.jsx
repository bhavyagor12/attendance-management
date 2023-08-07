import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Nav from "../components/Navbar";
import { TiTick } from "react-icons/ti";
import axios from "axios";
import Example from "../components/MainTable";
import Papa from '../components/Papa.js'
const MarkAttendance = () => {
  const [fetchLecture, setFetchLecture] = useState(false);
  const [date, setDate] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [type, setType] = useState("");
  const [division, setDivision] = useState("");
  const [batch, setBatch] = useState("");
  const [students, setStudents] = React.useState([]);

  const getStudents = async () => {
    const res = await axios.get("http://localhost:9000/getAllStudents");
    setStudents(getStudentArray(res.data));
    // console.log(res.data);
  };

  const getStudentArray = (students) => {
    let initialStudents = [];
    initialStudents = students?.map((student) => {
      return {
        sapid: student.sap_id,
        name: student.name,
      };
    });
    return initialStudents;
  };
  useEffect(() => {
    getStudents();
  }, []);

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
  return (
    <div>
      <Nav />
      <Banner />
      <Papa />
      {/* <div className="flex items-center justify-center mt-2">
        <button
          className="bg-[#AA5656] text-[#F1DBBF] font-[Poppins] py-2 px-6 rounded  hover:bg-[#F1DBBF] hover:text-[#AA5656] duration-500"
          onClick={handleClick}
        >
          {!fetchLecture ? <div>Fetch lecture</div> : <div>Close</div>}
        </button>
      </div> */}
      {/* {fetchLecture && (
        <div className="flex items-center justify-center mt-4">
          <div className="w-full max-w-md">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border-2">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="username"
                >
                  Date of Lecture
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="date"
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="mb-6 flex gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Subject Code
                  </label>
                  <input
                    className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="code"
                    type="text"
                    onChange={(e) => setSubjectId(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Type of lecture
                  </label>
                  <input
                    className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="type"
                    type="text"
                    onChange={(e) => setType(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-6 flex gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Class
                  </label>
                  <input
                    className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="class"
                    type="text"
                    onChange={(e) => setClass(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Division
                  </label>
                  <input
                    className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="division"
                    type="text"
                    onChange={(e) => setDivision(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Batch
                  </label>
                  <input
                    className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="batch"
                    type="text"
                    onChange={(e) => setBatch(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-[#AA5656] text-[#F1DBBF] font-[Poppins] py-2 px-6 rounded  hover:bg-[#F1DBBF] hover:text-[#AA5656] duration-500"
                  type="button"
                  onClick={fetchLec}
                >
                  Find Lecture
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}
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

      <Example attendanceMark={true} callApi="getAllStudents" />
    </div>
  );
};

export default MarkAttendance;

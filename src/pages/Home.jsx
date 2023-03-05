import React, { useEffect } from "react";
import Banner from "../components/Banner";
import Nav from "../components/Navbar";
import SubjectCard from "../components/SubjectCard";
import Table from "../components/Table";
import axios from "axios";
import Calender from "../components/Calender";
import { useRecoilValue } from "recoil";
import { infoState } from "../atoms/infoState";

const Home = () => {
  const info = useRecoilValue(infoState);
  let facultyID = info?.ID;
  const [subjects, setSubjects] = React.useState([]);
  const getData = async () => {
    try {
      const rawResponse = await fetch(
        `http://localhost:9000/getSubjectbyFacultyID/${facultyID}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const subjects = await rawResponse.json();
      setSubjects(subjects);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, [subjects]);

  return (
    <div>
      <Nav />
      <Banner />
      <div className="max-w-3xl mx-auto text-center pt-4 pb-4 md:pb-4">
        <h1 className="h2 mb-4">Subjects</h1>
        <p className=" text-sm md:text-xl text-gray-600">
          Here is a list of Subjects you teach,{" "}
          <span className="font-bold text-gray-900">Click on them</span> to see a
          list of lectures
        </p>
      </div>

      <div className="my-auto flex flex-wrap justify-around pt-2 pb-12 gap-24">
        {subjects.map((subject) => (
          <SubjectCard
            name={subject.name}
            year={subject.year}
            semester={subject.semester}
            // department={subject.department}
            subjectId={subject.ID}
          />
        ))}
      </div>
      <div className="max-w-3xl mx-auto text-center pt-4 pb-4 md:pb-4">
        <h1 className="h2 mb-4">Time - Table</h1>
        <p className=" text-sm md:text-xl text-gray-600">
          Here is a list of lectures you have,{" "}
          <span className="font-bold text-gray-900">Click on them</span> to mark
          attendance
        </p>
      </div>
      <div className="flex items-center justify-center overflow-hidden">
        <Calender />
      </div>
      {/* <Table /> */}
      {/* <Table /> */}
    </div>
  );
};

export default Home;

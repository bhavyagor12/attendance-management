import React, { useEffect } from "react";
import Banner from "../components/Banner";
import Nav from "../components/Navbar";
import SubjectCard from "../components/SubjectCard";
import Table from "../components/Table";
import axios from "axios";
import Calender from "../components/Calender";

const Home = () => {
  const [subjects, setSubjects] = React.useState([]);
  const getData = async () => {
    const res = await axios.get("http://localhost:9000/getAllSubjects");
    setSubjects(res.data);
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
          <span class="font-bold text-gray-900">Click on them</span> to see a
          list of lectures
        </p>
      </div>

      <div class="my-auto flex flex-wrap justify-around pt-2 pb-12 gap-2">
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
          <span class="font-bold text-gray-900">Click on them</span> to mark
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

import TimeTable from "../components/Timetable";
import React, { useEffect } from "react";
import Banner from "../components/Banner";
import Nav from "../components/Navbar";
import SubjectCard from "../components/SubjectCard";
import Table from "../components/Table";
import axios from "axios";

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
      <div class="container mx-auto my-auto flex flex-wrap justify-around pt-4 pb-12 gap-2">
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
      <Table />
      {/* <TimeTable /> */}
      {/* <Table /> */}
    </div>
  );
};

export default Home;

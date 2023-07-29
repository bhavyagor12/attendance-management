import React, { useEffect } from "react";
import Nav from "../components/Navbar";
import SubjectCard from "../components/SubjectCard";
import Calender from "../components/Calender";
import { useRecoilState, useRecoilValue } from "recoil";
import { infoState } from "../atoms/infoState";
import { eventState } from "../atoms/eventState";
import { getAllLectures, getSubjectsByFaculty } from "../utils/services";

const HomePage = () => {
  const info = useRecoilValue(infoState);
  let facultyID = info?.ID;
  const [subjects, setSubjects] = React.useState([]);
  const [eventsData, setEventsData] = useRecoilState(eventState);

  const initLectures = async () => {
    const lecs=await getAllLectures();
    if(lecs.length>0){
      setEventsData(lecs);
    }
  };

  const initSubjects = async () => {
    const subs=await getSubjectsByFaculty(facultyID);
    if(subs){
      setSubjects(subs);
    }
  };
  useEffect(() => {
    initLectures();
    initSubjects();
  }, []);

  return (
    <div>
      <Nav />
      {/* <Banner /> */}
      <div className="max-w-3xl mx-auto text-center pt-4 pb-4 md:pb-4">
        <h1 className="h2 mb-4 text-lg md:text-4xl font-bold">Time - Table</h1>
        <p className=" text-sm md:text-xl text-gray-600">
          Here is a list of lectures you have,{" "}
          <span className="font-bold text-gray-900">Click on them</span> to mark
          attendance
        </p>
      </div>
      <div className="flex items-center justify-center overflow-hidden">
        <Calender />
      </div>
      <div className="max-w-3xl mx-auto text-center pt-4 pb-4 md:pb-4 ">
        <h1 className="h2 mb-4 text-lg md:text-4xl font-bold">Subjects</h1>
        <p className=" text-sm md:text-xl text-gray-600">
          Here is a list of Subjects you teach,{" "}
          <span className="font-bold text-gray-900">Click on them</span> to see
          a list of lectures
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
            code={subject.subject_code}
          />
        ))}
      </div>
      {/* <Table /> */}
      {/* <Table /> */}
    </div>
  );
};

export default HomePage;
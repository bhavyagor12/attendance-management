import React, { useEffect, useState } from "react";
import Nav from "../components/Navbar";
import SubjectCard from "../components/SubjectCard";
import Calender from "../components/Calender";
import { useRecoilValue } from "recoil";
import { infoState } from "../atoms/infoState";
import { getSubjectsByFaculty } from "../utils/services";

const HomePage = () => {
  const [view, setView] = useState("week");
  const info = useRecoilValue(infoState);
  const [subjects, setSubjects] = useState([]);
  let facultyID = info?.ID;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 460) {
        setView("day");
      } else {
        setView("week");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const initSubjects = async () => {
    const subs = await getSubjectsByFaculty(facultyID);
    if (subs) {
      setSubjects(subs);
    }
  };

  useEffect(() => {
    initSubjects();
  }, []);

  return (
    <div>
      <Nav />
      <div className="max-w-3xl mx-auto text-center pt-4 pb-4 md:pb-4">
        <h1 className="h2 mb-4 text-lg md:text-4xl font-bold">Time - Table</h1>
        <p className="px-5 text-sm md:text-xl text-gray-600">
          Here is a list of lectures you have,{" "}
          <span className="font-bold text-gray-900">Click on them</span> to mark
          attendance
        </p>
      </div>
      <div className="flex items-center justify-center overflow-hidden">
        <Calender view={view} />
      </div>
      <div className="max-w-3xl mx-auto text-center pt-4 pb-4 md:pb-4 ">
        <h1 className="h2 mb-4 text-lg md:text-4xl font-bold">Subjects</h1>
        <p className="px-5 text-sm md:text-xl text-gray-600">
          Here is a list of Subjects you teach,{" "}
          <span className="font-bold text-gray-900">Click on them</span> to see
          a list of lectures
        </p>
      </div>

      <div className="my-auto flex flex-wrap justify-around pt-2 pb-12 gap-24">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.subject_code}
            name={subject.name}
            year={subject.year}
            semester={subject.semester}
            subjectId={subject.subject_code}
            code={subject.subject_code}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

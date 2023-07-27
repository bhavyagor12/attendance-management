import React, { useEffect } from "react";
import Banner from "../components/Banner";
import Nav from "../components/Navbar";
import SubjectCard from "../components/SubjectCard";
import Calender from "../components/Calender";
import { useRecoilState, useRecoilValue } from "recoil";
import { infoState } from "../atoms/infoState";
import { eventState } from "../atoms/eventState";
import axios from "axios";

const Home = () => {
  const info = useRecoilValue(infoState);
  let facultyID = info?.ID;
  const [subjects, setSubjects] = React.useState([]);
  const [eventsData, setEventsData] = useRecoilState(eventState);

  const getAllLectures = async () => {
    try {
      const response = await axios.get("http://localhost:9000/getAllLectures");
      const allLectures = response.data;
      console.log(allLectures);

      const updatedEventsData = []; // Initialize as an empty array to clear existing events

      allLectures.forEach((lecture) => {
        if (lecture.start_time) {
          const start_time = lecture.start_time;
          const end_time = lecture.end_time;
          const title = lecture.subject.name;
          const id = lecture.ID;
          // Create a new event object using the lecture details
          const newEvent = {
            id: id,
            title: title,
            start: new Date(start_time),
            end: new Date(end_time),
          };
          // Add the new event to the updatedEventsData array
          updatedEventsData.push(newEvent);
        }
      });

      setEventsData(updatedEventsData); // Update the eventsData state with the updatedEventsData array
      console.log(updatedEventsData); // Check the updated eventsData array with lectures added
    } catch (error) {
      console.error("Error fetching lectures:", error);
    }
  };

  useEffect(() => {
    getAllLectures();
  }, []);

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

export default Home;

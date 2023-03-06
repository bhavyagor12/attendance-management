import React, { useEffect } from "react";
import Banner from "../components/Banner";
import Nav from "../components/Navbar";
import axios from "axios";
import { useLocation } from "react-router-dom";
import LectureCard from "../components/LectureCard";
import Table from "../components/TableNoTick";
import Filters from "../components/Filters";
const SubjectPage = () => {
  const [lectures, setLectures] = React.useState([]);
  const [students, setStudents] = React.useState([]);
  let location = useLocation();
  // console.log(location.state.subjectId);
  const subjectId = location.state.subjectId;
  const getData = async () => {
    const res = await axios.get(
      `http://localhost:9000/getLecturesBySubject/${subjectId}`
    );
    console.log(res.data);
    setLectures(res.data);
  };
  useEffect(() => {
    getData();
  }, []);

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
  return (
    <div>
      <Nav />
      <Banner />
      <div className="max-w-3xl mx-auto text-center pt-4 pb-4 md:pb-4">
        <h1 className="h2 mb-4">Lectures</h1>
        <p className=" text-sm md:text-xl text-gray-600">
          Here is a list of conducted lectures,{" "}
          <span className="font-bold text-gray-900">Click on them</span> to view
          student data
        </p>
      </div>
      <div className="my-auto flex flex-wrap justify-around pt-2 pb-12 gap-2">
        {lectures.map((lecture) => (
          <LectureCard 
          date={lecture.date_of_lecture}
          type={lecture.type}
          division={lecture.division}
          batch={lecture.batch}
          ID={lecture.ID}
          // attendance={lecture.attendance}
          />
        ))}
      </div>
      <Filters />
      {students ? (
        <Table
          data={students}
          columns={[
            {
              label: "Sapid",
              field: "sapid",
              width: 150,
              attributes: {
                "aria-controls": "DataTable",
                "aria-label": "Name",
              },
            },
            {
              label: "Name",
              field: "name",
              width: 150,
              attributes: {
                "aria-controls": "DataTable",
                "aria-label": "Name",
              },
            },
          ]}
        />
      ) : (
        <div>Loadinggg</div>
      )}
    </div>
  );
};

export default SubjectPage;

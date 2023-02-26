import React, { useEffect } from "react";
import Banner from "../components/Banner";
import Nav from "../components/Navbar";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import LectureCard from "../components/LectureCard";
const SubjectPage = () => {
  const [lectures, setLectures] = React.useState([]);
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
  return (
    <div>
      <Nav />
      <Banner />
      <div className="max-w-3xl mx-auto text-center pt-4 pb-4 md:pb-4">
        <h1 className="h2 mb-4">Lectures</h1>
        <p className=" text-sm md:text-xl text-gray-600">
          Here is a list of conducted lectures,{" "}
          <span class="font-bold text-gray-900">Click on them</span> to view
          student data
        </p>
      </div>
      <div class="my-auto flex flex-wrap justify-around pt-2 pb-12 gap-2">
        {lectures.map((lecture) => (
          <LectureCard />
        ))}
      </div>
    </div>
  );
};

export default SubjectPage;

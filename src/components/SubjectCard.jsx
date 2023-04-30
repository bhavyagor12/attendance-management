import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { subjectState } from "../atoms/subjectState";
const SubjectCard = ({ name, year, semester, subjectId }) => {
  const [subject, setSubject] = useRecoilState(subjectState);
  const navigate = useNavigate();
  const handleClick = () => {
    setSubject(subjectId);
    navigate(`/subject/${subjectId}`, {
      state: { subjectId: `${subjectId}` },
    });
  };
  return (
    <div onClick={handleClick}>
      <div className=" flex py-8  border rounded-lg shadow bg-gray-800 border-gray-700">
        <div className="mx-4">
          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-white ">
            {name}
          </h5>
          <h4 className="mb-2 text-2xl font-semibold tracking-tight text-white ">
            6000321
          </h4>
        </div>
        <div className=" px-8 mx-4">
          <p className="font-normal text-gray-300 w-[100%] ">Year: {year}</p>
          <p className="font-normal text-gray-300 ">Semester: {semester}</p>
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;

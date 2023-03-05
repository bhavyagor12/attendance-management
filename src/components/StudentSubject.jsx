import React from "react";
import { Link, useNavigate } from "react-router-dom";
const SubjectCard = ({ name, year, semester, subjectId }) => {
  return (
    <div>
      <div class=" flex py-8  border rounded-lg shadow bg-gray-800 border-gray-700">
        <div className="mx-4">
          <h5 class="mb-2 text-2xl font-semibold tracking-tight text-white ">
            DWM
          </h5>
          <h4 class="mb-2 text-2xl font-semibold tracking-tight text-white ">
            6000321
          </h4>
        </div>
        <div className=" px-8 mx-4">
          <p class="font-normal text-gray-300 w-[100%] ">Lectures Conducted: 50</p>
          <p class="font-normal text-gray-300 ">Lectures Attended: 20 </p>
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;

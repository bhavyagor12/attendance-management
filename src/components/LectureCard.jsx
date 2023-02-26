import React from "react";

const LectureCard = () => {
  const handleClick = () => {
    console.log("hi");
  };
  return (
    <div onClick={handleClick}>
      <div class=" flex py-8  border rounded-lg shadow bg-gray-800 border-gray-700">
        <div className="mx-4">
          <h5 class="mb-2 text-2xl font-semibold tracking-tight text-white ">
            Date
          </h5>
          <h4 class="mb-2 text-2xl font-semibold tracking-tight text-white ">
            Class - Division
          </h4>
        </div>
        <div className=" px-8 mx-4">
          <p class="font-normal text-gray-300 w-[100%] ">Type: </p>
          <p class="font-normal text-gray-300 ">Students attended: </p>
        </div>
      </div>
    </div>
  );
};

export default LectureCard;

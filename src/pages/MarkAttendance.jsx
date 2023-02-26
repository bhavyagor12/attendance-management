import React, { useState } from "react";
import Banner from "../components/Banner";
import Nav from "../components/Navbar";
import Table from "../components/Table";
import { TiTick } from "react-icons/ti";
const MarkAttendance = () => {
  const [fetchLecture, setFetchLecture] = useState(false);

  const handleClick = () => {
    setFetchLecture(!fetchLecture);
  };
  console.log(fetchLecture);
  return (
    <div>
      <Nav />
      <Banner />
      <div className="flex items-center justify-center mt-2">
        <button
          className="bg-[#AA5656] text-[#F1DBBF] font-[Poppins] py-2 px-6 rounded  hover:bg-[#F1DBBF] hover:text-[#AA5656] duration-500"
          onClick={handleClick}
        >
          {!fetchLecture ? <div>Fetch lecture</div> : <div>Close</div>}
        </button>
      </div>
      {fetchLecture && (
        <div className="flex items-center justify-center mt-4">
          <div class="w-full max-w-md">
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border-2">
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="username"
                >
                  Date of Lecture
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="date"
                  type="date"
                />
              </div>
              <div class="mb-6 flex gap-4">
                <div>
                  <label class="block text-gray-700 text-sm font-bold mb-2">
                    Subject Code
                  </label>
                  <input
                    class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="code"
                    type="text"
                  />
                </div>
                <div>
                  <label class="block text-gray-700 text-sm font-bold mb-2">
                    Type of lecture
                  </label>
                  <input
                    class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="type"
                    type="text"
                  />
                </div>
              </div>
              <div class="mb-6 flex gap-4">
                <div>
                  <label class="block text-gray-700 text-sm font-bold mb-2">
                    Class
                  </label>
                  <input
                    class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="class"
                    type="text"
                  />
                </div>
                <div>
                  <label class="block text-gray-700 text-sm font-bold mb-2">
                    Division
                  </label>
                  <input
                    class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="division"
                    type="text"
                  />
                </div>
                <div>
                  <label class="block text-gray-700 text-sm font-bold mb-2">
                    Batch
                  </label>
                  <input
                    class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="batch"
                    type="text"
                  />
                </div>
              </div>
              <div class="flex items-center justify-between">
                <button
                  className="bg-[#AA5656] text-[#F1DBBF] font-[Poppins] py-2 px-6 rounded  hover:bg-[#F1DBBF] hover:text-[#AA5656] duration-500"
                  type="button"
                >
                  Find Lecture
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="max-w-3xl mx-auto text-center pt-4 pb-4 md:pb-4">
        <h1 className="h2 mb-2">Students Table</h1>
        <p className="flex items-center justify-center gap-2 text-sm md:text-xl text-gray-600">
          Here is a list of students,{" "}
          <div className="flex items-center justify-center">
            <span class="font-bold text-gray-900"> Tick</span>
            <TiTick className="text-black" size={25} />
            to mark attendance
          </div>
        </p>
      </div>
      <Table />
    </div>
  );
};

export default MarkAttendance;

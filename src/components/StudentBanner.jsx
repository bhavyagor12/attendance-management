import React from "react";
import { MdWavingHand } from "react-icons/md";
import { useLocation } from "react-router-dom";
const Banner = () => {
    let location = useLocation();

  const sapId = location.state.sapId;
  const name= location.state.name;
  return (
    <section class="flex z-[-15]">
      <div class="flex bg-gray-800 w-[100vw]">
        <div class="flex flex-wrap">
          <div class="w-[80vw] pt-[6%] md:pt-[2%] px-[4%] mb-10 ">
            <div class="flex items-center text-xl md:text-3xl font-bold text-white gap-2">
              <h3 className="text-lg md:text-4xl">
                <span class="text-green-300">Hello</span> {name}
              </h3>
              <div class="mb-2">
                <MdWavingHand className="text-green-300" />
              </div>
            </div>
            <p class="text-[12px] md:text-lg font-medium text-indigo-100 pt-[1%]">
              Hope I am not in the defaulters list
            </p>
            <p class="text-[12px] md:text-lg font-medium text-indigo-100 pt-[1%]">SapID: {sapId}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;

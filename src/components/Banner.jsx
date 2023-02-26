import React from "react";
import { MdWavingHand } from "react-icons/md";
const Banner = () => {
  return (
    <section class="mt-[8%] flex md:mt-[3%] ">
      <div class="container">
        <div class="flex bg-gray-800 w-[100vw]">
          <div class="flex flex-wrap">
            <div class="w-[100vw] pt-[6%] md:pt-[2%] px-[4%] mb-10 ">
              <div class="flex items-center text-3xl font-bold text-white gap-2">
                <h3>
                  <span class="text-green-300">Hello</span> Harshal Dalvi
                </h3>
                <MdWavingHand />
              </div>
              <p class="text-md font-medium text-indigo-100 pt-[1%]">
                Hope you are having a great day!
              </p>
              <p class="text-sm font-medium text-indigo-100 pt-[1%]">SapID</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;

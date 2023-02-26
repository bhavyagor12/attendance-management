import React from "react";
import { MdWavingHand } from "react-icons/md";
import { useRecoilValue } from "recoil";
import { infoState } from "../atoms/infoState";
const Banner = () => {
  const info = useRecoilValue(infoState);
  return (
    <section class="flex">
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
    </section>
  );
};

export default Banner;

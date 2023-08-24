import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { VscRocket } from "react-icons/vsc";
import { useNavigate } from "react-router";
import { useResetRecoilState } from "recoil";
import { infoState } from "../atoms/infoState";
import Swal from "sweetalert2";
const Nav = () => {
  const navigate = useNavigate();
  const handleClicked = () => {
    navigate("/home");
  };
  const resetValue = useResetRecoilState(infoState);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const rawResponse = await fetch("http://localhost:9000/logout", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(userData),
      });
      resetValue();
      navigate("/");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Logout Unsuccessful",
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
  };
  let Links = [
    {
      name: "HOME",
      link: "/",
      onclick: () => {
        navigate("/home");
      },
    },

    {
      name: "REPORTS",
      link: "/report",
      onclick: () => {
        navigate("/report");
      },
    },
    { name: "LOGOUT", link: "/", onclick: handleLogout },
  ];
  let [open, setOpen] = useState(false);
  return (
    <div className="md:flex items-center justify-between  bg-white py-4 md:py-2 px-7 h-20">
      <div
        className="font-bold text-lg md:text-2xl cursor-pointer flex items-center font-[Poppins] 
        text-gray-800"
      >
        <span className="text-3xl text-indigo-600 mr-1" onClick={handleClicked}>
          <ion-icon name="logo-ionic">
            <VscRocket />
          </ion-icon>
        </span>
        Attendance Management System
      </div>
      <div
        onClick={() => setOpen(!open)}
        className="text-3xl absolute right-8 top-6 cursor-pointer z-10 md:hidden"
      >
        <ion-icon name={open ? "close" : "menu"} className="mb-8">
          {!open ? <GiHamburgerMenu /> : <RxCross1 />}
        </ion-icon>
      </div>
      <div className="flex items-center justify-end">
        <ul
          className={`justify-center items-center md:flex md:pb-0 pb-12 absolute md:static bg-white pl-8 left-0 w-full transition-all duration-500 ease-in cursor-pointer ${
            open ? "top-20" : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
              {link.name !== "LOGOUT" ? (
                <div
                  // href={link.link}
                  className="text-gray-800 hover:text-gray-400 duration-500"
                  onClick={link.onclick}
                >
                  {link.name}
                </div>
              ) : (
                <button
                  // href={link.link}
                  className="bg-[#AA5656] text-[#F1DBBF] font-[Poppins] py-2 px-8  rounded  hover:bg-[#F1DBBF] hover:text-[#AA5656] duration-500"
                  onClick={link.onclick}
                >
                  {link.name}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Nav;

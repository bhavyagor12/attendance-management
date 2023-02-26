import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { VscRocket } from "react-icons/vsc";
import { useNavigate } from "react-router";
const Nav = () => {
  const navigate = useNavigate();
  const handleClicked = () => {
    navigate("/home");
  };
  let Links = [
    { name: "HOME", link: "/" },
    { name: "ABOUT", link: "/" },
    { name: "BLOG'S", link: "/" },
    { name: "CONTACT", link: "/" },
  ];
  let [open, setOpen] = useState(false);
  return (
    <div className="shadow-md flex items-center justify-between w-full h-20">
      <div className="md:flex bg-white py-4 px-7">
        <div
          className="font-bold text-lg md:text-2xl cursor-pointer flex items-center font-[Poppins] 
        text-gray-800"
        >
          <span
            className="text-3xl text-indigo-600 mr-1"
            onClick={handleClicked}
          >
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
            className={`justify-center items-center md:flex md:mt-5  md:pb-0 pb-12 absolute md:static bg-white pl-8   left-0 w-full  transition-all duration-500 ease-in ${
              open ? "top-20 " : "top-[-490px]"
            }`}
          >
            {Links.map((link) => (
              <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
                <a
                  href={link.link}
                  className="text-gray-800 hover:text-gray-400 duration-500"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;

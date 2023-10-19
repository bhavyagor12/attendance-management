import React, { useState } from "react";
import Banner from "../components/Banner";
import Nav from "../components/Navbar";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { getFacultyById, logout, updateFacultyById } from "../utils/services";
import { infoState } from "../atoms/infoState";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [facInfo, setFacInfo] = useState();
  const info = useRecoilValue(infoState);
  const navigate = useNavigate();
  const resetValue = useResetRecoilState(infoState);

  const handleLogout = async (e) => {
    e.preventDefault();
    resetValue();
    try {
      const rawResponse = await logout();
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
  const togglePassword = (e) => {
    e.preventDefault();
    setPasswordShown(!passwordShown);
  };
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const facInfo = await getFacultyById(info.sap_id);
    setFacInfo(facInfo);
    setName(facInfo.name);
    setEmail(facInfo.email);
    setPassword(facInfo.password);
  };
  const handleSave = async (e) => {
    e.preventDefault();
    const newInfo = {
      name,
      email,
      password,
    };
    const res = await updateFacultyById(info.sap_id, newInfo);
    if (res !== null && password !== facInfo.password) {
      handleLogout(e);
    }
  };
  return (
    <div>
      <Nav />
      <div className="flex flex-col w-full items-center">
        <Banner />
        <form className="w-[35%] pt-[6%] md:pt-[2%] px-[4%] mb-10 flex flex-col gap-3 items-center justify-center">
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete=""
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Name"
          />
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete=""
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email"
          />
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <div className="relative w-full">
            <input
              id="password"
              name="password"
              type={passwordShown ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
            <div className="absolute right-2 top-2">
              <button onClick={togglePassword}>
                {passwordShown ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </button>
            </div>
          </div>
          <button
            className="bg-gray-800 text-green-300 font-Poppins py-2 px-6 rounded  hover:bg-green-300 hover:text-gray-800 duration-500 w-fit"
            onClick={handleSave}
          >
            Update changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;

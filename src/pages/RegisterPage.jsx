import React, { useState } from "react";
import Swal from "sweetalert2";
// import logo from "../images/logo.png";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { infoState } from "../atoms/infoState";
import { Register } from "../utils/services";
const RegisterPage = () => {
  const [sapid, setSapid] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [info, setInfo] = useRecoilState(infoState);
  const navigate = useNavigate();
  const togglePassword = (e) => {
    e.preventDefault();
    setPasswordShown(!passwordShown);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const teacherData = {
      sap_id: Number(sapid),
      name: name,
      password,
    };
    const infol = await Register(teacherData);
    if (infol) {
      setInfo(infol);
      navigate("/login");
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-around pt-0">
      <div className="hidden md:flex w-[50vw] h-[100vh]">
        <img
          src="https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg"
          alt="hi"
        />
      </div>
      <div className="flex items-center justify-center h-[100vh] bg-white w-[100vw] md:w-[50vw]">
        <div className="max-w-md w-full space-y-8 border-1  border-gray-300 p-2 lg-[700px] shadow-xl shadow-gray-400 opacity-90">
          <div>
            <h2 className="mt-6 text-center text-xl md:text-2xl font-extrabold text-gray-700">
              Attendance Management System
            </h2>
          </div>
          <form className="mt-8 space-y-6 gap-2">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm">
              <div className="mb-4">
                <label htmlFor="sap_id" className="sr-only">
                  Sap Id
                </label>
                <input
                  id="sap_id"
                  name="sap_id"
                  type="text"
                  autoComplete=""
                  required
                  value={sapid}
                  onChange={(e) => setSapid(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="SAP ID"
                />
              </div>
              <div className="mb-4">
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={passwordShown ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-[#AA5656] text-[#F1DBBF] font-[Poppins] py-2 px-6 rounded  hover:bg-[#F1DBBF] hover:text-[#AA5656] duration-500"
                onClick={handleSubmit}
              >
                Register
              </button>
            </div>
            <h2 className="text-center text-l font-bold text-gray-700">
              Already Registered?
            </h2>
            <div className="flex items-center justify-center">
              <button
                className="bg-[#AA5656] text-[#F1DBBF] font-[Poppins] py-2 px-6 rounded  hover:bg-[#F1DBBF] hover:text-[#AA5656] duration-500"
                onClick={handleClick}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

import React, { useState } from "react";
import Swal from "sweetalert2";
// import logo from "../images/logo.png";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { infoState } from "../atoms/infoState";
const Login = () => {
  const [sapid, setSapid] = useState("");
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
    console.log(`sap ID: ${sapid}, Password: ${password}`);
    const userData = {
      sap_id: Number(sapid),
      password,
    };
    try {
      const rawResponse = await fetch("http://localhost:9000/login", {  
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const content = await rawResponse.json();
      console.log(content);
      if (content!=="AuthError") {
        setInfo({
          sap_id: content.sap_id,
          name: content.name,
          ID: content.ID,
        });
        navigate("/home");
      }
      else {
        Swal.fire({
          title: "Error!",
          text: "Entered credentials dont exist",
          icon: "error",
          confirmButtonText: "Retry",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Entered credentials dont exist",
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
  };
console.log(info)
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
            <h2 className="text-center text-xl font-extrabold text-gray-700">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6 gap-2">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px gap-y-4">
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
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

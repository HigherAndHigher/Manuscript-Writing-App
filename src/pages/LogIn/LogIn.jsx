import { useState } from "react";
import "./LogIn.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BackendURL } from "../../components/untile";
import useAuth from "../../hook/useAuth";

export const LogIn = () => {
  const navigate = useNavigate();
  const [presentUser, setPresentUser] = useState({});
  const { login } = useAuth();

  const loadpresentUser = (e) => {
    setPresentUser((item) => ({ ...item, [e.target.name]: e.target.value }));
  };

  const logIn = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(BackendURL + "/auth/login", presentUser); // Corrected payload
      console.log(res.data);
      if (res.data.state) {
        
        setPresentUser({ username: "", password: "" }); // Resetting user info
        navigate("/Manuscript");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <form
      onSubmit={logIn}
      className="max-w-[600px] mx-auto mt-[200px] p-[16px] bg-white border-[1px] border-[rgb(238, 192, 108)] border-dotted rounded-[8px]"
    >
      <h1>Login</h1>
      <label htmlFor="username">
        <b>Name</b>
      </label>
      <input
        name="username"
        type="text"
        className="w-full p-[15px] mt-[5px] mb-[22px] bg-[#f1f1f1] border-none focus:bg-[#ddd] focus:outline-none"
        onChange={loadpresentUser}
        placeholder="Enter the name"
      />
      <label htmlFor="password">
        <b>Password</b>
      </label>
      <input
        name="password"
        type="password"
        className="w-full p-[15px] mt-[5px] mb-[22px] bg-[#f1f1f1] border-none focus:bg-[#ddd] focus:outline-none"
        onChange={loadpresentUser}
        placeholder="Correct!"
      />
      <div
        type="submit"
        className="bg-[#04AA6D] text-white py-[16px] px-[20px] cursor-pointer w-full opacity-80 text-[18px] hover:opacity-100"
        onClick={logIn}
      >
        Login
      </div>{" "}
      {/* Changed to button */}
      <Link
        to="/Register"
        className="bg-[#04AA6D] text-white py-[16px] px-[20px] cursor-pointer w-full opacity-80 text-[18px] hover:opacity-100 mt-[30px] block no-underline"
      >
        Register
      </Link>{" "}
      {/* Fixed typo */}
    </form>
  );
};

import { useState } from "react";
import "./Register.css";

import axios from "axios";
import { BackendURL } from "../../components/untile";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [userinfor, setUserinfor] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [passwordcon, setPasswordcon] = useState("");

  const [err, setErr] = useState();

  const setUser = (e) => {
    setUserinfor((infor) => ({ ...infor, [e.target.name]: e.target.value }));
  };

  const passWordcon = (e) => {
    setPasswordcon(e.target.value);
  };

  const registeUser = async (e) => {
    e.preventDefault();

    if (userinfor.password.length < 8) {
      setErr("Your password must be more than 8 letters!");
    } else if (userinfor.password != passwordcon) {
      setErr("Type correctly!");
    } else {
      alert(userinfor.password);
      let res = await axios.post(BackendURL + "/auth/register", {
        userinfor,
      });
      console.log(res.data);
      console.log(res.data.status);

      if (res.status) {
        setUserinfor({
          email: "",
          username: "",
          password: "",
        });
        navigate("/Plan");
      }
    }
  };

  return (
    <form
      action=""
      class="max-w-[600px] mx-auto mt-[200px] p-[16px] bg-white border-[1px] border-[rgb(238, 192, 108)] border-dotted rounded-[8px]"
    >
      <h1>Register</h1>
      <label for="email">
        <b>Email</b>
      </label>
      <input
        name="email"
        type="text"
        className="w-full p-[15px] mt-[5px] mb-[22px] bg-[#f1f1f1] border-none focus:bg-[#ddd] focus:outline-none"
        onChange={setUser}
        placeholder="example@email.com"
      />
      <label for="username">
        <b>Name</b>
      </label>
      <input
        name="username"
        type="text"
        className="w-full p-[15px] mt-[5px] mb-[22px] bg-[#f1f1f1] border-none focus:bg-[#ddd] focus:outline-none"
        onChange={setUser}
        placeholder="Enter the name"
      />
      <label for="password">
        <b>Password</b>
      </label>
      <input
        name="password"
        type="password"
        className="w-full p-[15px] mt-[5px] mb-[22px] bg-[#f1f1f1] border-none focus:bg-[#ddd] focus:outline-none"
        onChange={setUser}
        placeholder="at least 8 letters"
      />
      <label for="passwordcon">
        <b>Password Confirm</b>
      </label>
      <input
        name="passwordcon"
        type="password"
        className="w-full p-[15px] mt-[5px] mb-[22px] bg-[#f1f1f1] border-none focus:bg-[#ddd] focus:outline-none"
        onChange={passWordcon}
        placeholder="correct!"
      />
      <div
        type="submit"
        className="bg-[#04AA6D] text-white py-[16px] px-[20px] cursor-pointer w-full opacity-80 text-[18px] hover:opacity-100"
        onClick={registeUser}
      >
        Register
      </div>
      <p className="text-[rgb(247, 5, 5)] flex justify-center text-[18px] font-[600]">
        {err ? err : ""}
      </p>
    </form>
  );
};

export default Register;

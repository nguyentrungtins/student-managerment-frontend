"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../../../public/Logo.svg";
import Content from "../../../../public/content.png";
import { FaUserAlt, FaLock } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";
import Toastify, { warn } from "@/components/toastify";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("access_token")) {
      if (sessionStorage.getItem("role") == "Student") {
        router.push("/dashboard");
      } else {
        router.push('/admin');
      }
    }
  }, []);

  const handleLogin = () => {
    const data = {
      user_name: userName,
      pass_word: passWord,
    };
    console.log(1);
    axios
      .post("http://localhost:3030/auth/login", data)
      .then((response) => {
        sessionStorage.setItem("access_token", response.data.access_token);
        sessionStorage.setItem("role", response.data.role);
        if (response.data.role == "Student") {
          router.push("/dashboard");
        } else {
          router.push('/admin');
        }
      })
      .catch(function (error) {
        //const err = error.response.data.message || error;
        //console.log(err)
        warn("Đăng nhập không thành công. Vui lòng kiểm tra lại tài khoản và mật khẩu!");
      });
  };

  return (
    <div className="bg-slate-50 w-screen h-screen flex justify-center items-center">
      <Toastify />
      <div className="flex justify-center p-4 w-[1100px] h-[700px] rounded-md">
        <div className="w-1/2 p-3 bg-[#365DC1] flex items-center rounded-l-2xl drop-shadow-xl">
          <Image src={Content} alt="img" />
        </div>
        <div className="w-1/2 p-3 bg-white drop-shadow-xl rounded-r-2xl">
          <div className="p-5 flex justify-center">
            <Image src={Logo} alt="Logo Images" height={100} />
          </div>
          <h1 className="p-4 flex justify-center text-3xl font-semibold">
            Hello Again!
          </h1>
          <div className="p-5 flex justify-center text-sm text-center font-light">
            We have built a large, rich academic community strong, eager to use
            knowledge as a tool to create innovation, Innovative breakthroughs
            and a better world.
          </div>
          <div className="flex flex-col w-4/6 ml-auto mr-auto">
            <div className="flex items-center relative mt-5">
              <input
                type="text"
                placeholder="Enter your username ... "
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
                className="rounded-xl pl-12 focus:outline-gray-900 w-full p-2.5 border-solid border-2 border-indigo-100"
              />
              <FaUserAlt className="absolute left-4" />
            </div>

            <div className="flex items-center relative mt-5 mb-20">
              <input
                type="password"
                placeholder="Enter your password ... "
                value={passWord}
                onChange={(event) => setPassWord(event.target.value)}
                className="rounded-xl pl-12 focus:outline-gray-900 w-full p-2.5 border-solid border-2 border-indigo-100"
              />
              <FaLock className="absolute left-4" />
            </div>
          </div>
          <div
            onClick={handleLogin}
            className="rounded-xl font-semibold mb-5 p-2 bg-sky-700 text-white w-4/6 ml-auto mr-auto text-center hover:cursor-pointer"
          >
            Login
          </div>
          <div className="text-center text-sm font-light">
            Dont have account yet?
            <div className="text-indigo-700 font-medium">
              Contact with us now.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

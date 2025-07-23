"use client";

import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { FaApple } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import Image from "next/image";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  function toggleShowPassword1() {
    setShowPassword(!showPassword);
  }

  function toggleShowPassword2() {
    setShowPassword2(!showPassword2);
  }

  function divInput() {
    return "flex justify-between items-center w-full gap-4 text-sm";
  }

  function classInput() {
    return "bg-transparent text-white w-full h-10 p-2 border border-slate-500 rounded-md focus:outline-none focus:border-blue-500 transition-colors duration-1000";
  }
  return (
    <div className="flex flex-col gap-2 justify-center items-center w-full min-h-screen bg-[url('/bg_traveloka5.png')] bg-cover bg-center">
      <div className="flex justify-center items-center gap-2 ">
        <Image
          alt="Traveloka Logo"
          src={"/traveloka_logo.png"}
          width={50}
          height={50}
        />
        <div className=" font-semibold text-slate-300">REGISTER PAGE</div>
      </div>

      <div className="bg-black/80 shadow-2xl flex flex-col justify-center gap-6 items-center w-3/4 h-[530px] rounded-2xl text-white p-4">
        {/* Awal Form */}
        <form className="flex flex-col items-center w-3/4 gap-4">
          <div className={divInput()}>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              className={classInput()}
            />
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              className={classInput()}
            />
          </div>
          <div className={divInput()}>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              className={classInput()}
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className={classInput()}
            />
          </div>

          <div className={divInput()}>
            <div className="relative w-full ">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                className="w-full h-10 p-2 border border-slate-500 rounded-md focus:outline-none focus:border-blue-500 transition-colors duration-1000 bg-transparent text-white"
              />

              <button
                type="button"
                onClick={toggleShowPassword1}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <AiOutlineEye className="text-lg" />
                ) : (
                  <AiOutlineEyeInvisible className="text-lg" />
                )}
              </button>
            </div>

            <div className="relative w-full ">
              <input
                type={showPassword2 ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                className={classInput()}
              />

              <button
                type="button"
                onClick={toggleShowPassword2}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <AiOutlineEye className="text-lg" />
                ) : (
                  <AiOutlineEyeInvisible className="text-lg" />
                )}
              </button>
            </div>
          </div>
          <div className={divInput()}>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Phone Number"
              className={classInput()}
            />

            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              placeholder="Date of Birth"
              className={classInput()}
            />
          </div>

          <input
            type="text"
            name="address"
            id="address"
            placeholder="Address"
            className="w-full h-10 p-2 text-white border border-slate-500 rounded-md focus:outline-none focus:border-blue-500 transition-colors duration-1000 bg-transparent"
          />

          <button className="bg-blue-950 w-2/3 py-3 rounded-md cursor-pointer hover:bg-[#0B98F0] font-semibold">
            SUBMIT
          </button>
        </form>
        {/* Akhir Form */}

        {/* Awal sign up faster with */}
        {/* <div className="text-xs text-slate-400">
          ---- sign up faster with ----
        </div> */}
        {/* Akhir sign up faster with */}

        {/* Awal Logo Socmed */}
        {/* <div
          className="flex items-cen\
         gap-4"
        >
          <Link
            href={"/apple.com"}
            className="border border-white p-2 rounded-md hover:border-transparent group "
          >
            <FaApple className="text-xl text-black group-hover:text-white" />
          </Link>
          <Link
            href={"/facebook.com"}
            className="border border-white p-2 rounded-md hover:border-transparent group "
          >
            <FaFacebook className="text-xl text-blue-700 group-hover:text-white" />
          </Link>
          <Link
            href={"/google.com"}
            className="border border-white p-2 rounded-md hover:border-transparent group "
          >
            <FcGoogle className="text-xl group-hover:text-white" />
          </Link>
          <Link
            href={"/tiktok.com"}
            className="border border-white p-2 rounded-md hover:border-transparent group "
          >
            <AiFillTikTok className="text-xl text-black group-hover:text-white" />
          </Link>
        </div> */}
        {/* Akhir Logo Socmed */}

        {/* Awal already */}
        <div className="text-xs">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="font-bold text-[#0B98F0] hover:text-white "
          >
            LOG IN
          </Link>
        </div>
        {/* Akhir already */}

        {/* Awal by loggin in */}
        <div className="text-xs text-slate-400">
          By logging in, you agree to Traveloka's Privacy policy and Terms &
          Conditions.
        </div>
        {/* Akhir by logging in */}

        {/* Awal all rights */}
        <div className="flex gap-2  ">
          <Image
            alt="Traveloka Logo"
            src={"/traveloka_putih.png"}
            width={100}
            height={50}
          />
          <div className="text-xs font-light flex items-end text-slate-300  ">
            All Rights Reserved
          </div>
        </div>
        {/* Akhir all rights */}
      </div>
    </div>
  );
}

// type InputCreateUser = {
//     address: string;
//     firstName: string;
//     lastName: string;
//     username: string;
//     email: string;
//     password: string;
//     phoneNumber: string;
//     dateOfBirth: Date;
// }

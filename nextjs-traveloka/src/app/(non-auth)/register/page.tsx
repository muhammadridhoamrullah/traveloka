"use client";

import React, { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { FaApple } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import { NextSeo } from "next-seo";
import { generateMetaData } from "@/db/utils/metadata";
import z from "zod";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function Register() {
  const navigate = useRouter();
  const url = process.env.NEXT_PUBLIC_CLIENT_URL!;

  const [formRegister, setFormRegister] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: "",
    address: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState("");

  const [loading, setLoading] = useState(false);

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormRegister({
      ...formRegister,

      [name]: value,
    });
  }

  function confirmPasswordHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setConfirmPassword(value);
  }

  function handleConfirmPasswordBlur() {
    if (confirmPassword !== formRegister.password) {
      setPasswordMismatch("Passwords do not match");
    } else {
      setPasswordMismatch("");
    }
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(`${url}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formRegister),
        cache: "no-cache",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to register");
      }

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Registration successful! Please check your email to verify your account.",
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
      }).then(() => {
        navigate.push("/login");
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const path = error.issues[0].path[0];
        const message = error.issues[0].message;

        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Error on path: ${String(path)}, error message: ${message}`,
        });
      } else if (error instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Internal Server Error",
        });
      }
    } finally {
      setLoading(false);
    }
  }

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
    return " text-white w-full h-10 p-2 border border-slate-500 rounded-md focus:outline-none focus:border-blue-500 transition-colors duration-1000";
  }

  generateMetaData({
    title: "Register - Traveloka",
    description: "Halaman register akun traveloka",
    canonical: "https://traveloka.com/register",
    icons: {
      icon: "/traveloka_logo.png",
    },
    ogTitle: "Register - Traveloka",
    ogDescription: "Halaman register akun traveloka",
    ogUrl: "http://localhost:3000/register",
    ogImage: "/traveloka_logo.png",
  });
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
        <form
          onSubmit={submitHandler}
          className="flex flex-col items-center w-3/4 gap-4"
        >
          <div className={divInput()}>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              className={classInput()}
              value={formRegister.firstName}
              onChange={changeHandler}
            />
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              className={classInput()}
              value={formRegister.lastName}
              onChange={changeHandler}
            />
          </div>
          <div className={divInput()}>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              className={classInput()}
              value={formRegister.username}
              onChange={changeHandler}
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className={classInput()}
              value={formRegister.email}
              onChange={changeHandler}
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
                value={formRegister.password}
                onChange={changeHandler}
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
                value={confirmPassword}
                onChange={confirmPasswordHandler}
                onBlur={handleConfirmPasswordBlur}
                className={`${classInput()} ${
                  passwordMismatch
                    ? "border-red-500 focus:border-red-500 bg-red-500/70 "
                    : "border-slate-500 focus:border-blue-500"
                }`}
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
            {/* {passwordMismatch && (
              <div className="text-red-400 text-sm mt-1 w-full text-center">
                {passwordMismatch}
              </div>
            )} */}
          </div>
          <div className={divInput()}>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Phone Number"
              className={classInput()}
              value={formRegister.phoneNumber}
              onChange={changeHandler}
            />

            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              placeholder="Date of Birth"
              className={classInput()}
              value={formRegister.dateOfBirth}
              onChange={changeHandler}
            />
          </div>

          <input
            type="text"
            name="address"
            id="address"
            placeholder="Address"
            className="w-full h-10 p-2 text-white border border-slate-500 rounded-md focus:outline-none focus:border-blue-500 transition-colors duration-1000 bg-transparent"
            value={formRegister.address}
            onChange={changeHandler}
          />

          <button
            type="submit"
            disabled={passwordMismatch !== ""}
            className="bg-blue-950 w-2/3 py-3 rounded-md cursor-pointer hover:bg-[#0B98F0] font-semibold"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <AiOutlineLoading className="animate-spin text-lg" />
              </div>
            ) : (
              <div>SUBMIT</div>
            )}
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

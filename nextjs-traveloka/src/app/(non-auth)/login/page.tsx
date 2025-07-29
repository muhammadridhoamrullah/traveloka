"use client";

import { generateMetaData } from "@/db/utils/metadata";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import Swal from "sweetalert2";
import z from "zod";
import { AiOutlineLoading } from "react-icons/ai";
import Cookies from "js-cookie";

export default function Login() {
  const cookies = Cookies.get("access_token");

  const navigate = useRouter();
  const url = process.env.NEXT_PUBLIC_CLIENT_URL!;
  // State for login form
  const [loginForm, setLoginForm] = useState({
    identifier: "",
    password: "",
  });

  // State for loading
  const [loading, setLoading] = useState(false);

  // Function for handle input change
  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  }

  // Asynchronous function for submit login form
  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await fetch(`${url}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginForm),
        cache: "no-cache",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      Cookies.set("access_token", result.access_token);
      navigate.push("/home");
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

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  // Check if user is already logged in
  useEffect(() => {
    if (cookies) {
      navigate.push("/home");
    }
  }, []);

  // For generate metadata
  generateMetaData({
    title: "Login - Traveloka",
    description: "Login page for the Traveloka application",
    canonical: "https://traveloka.com/login",
    icons: {
      icon: "/traveloka_logo.png",
    },
    ogTitle: "Login - Traveloka",
    ogDescription:
      "Login to your Traveloka account to access your bookings and more.",
    ogUrl: "http://localhost:3000/login",
    ogImage: "/traveloka_logo.png",
  });
  return (
    <div className="flex flex-col gap-5 items-center justify-center min-h-screen bg-[url('/bg_traveloka5.png')] bg-cover bg-center ">
      <div className="flex justify-center items-center gap-2">
        <Image
          src={"/traveloka_logo.png"}
          alt="Traveloka Logo"
          width={50}
          height={50}
        />

        <div className="text-slate-300 font-semibold">LOGIN PAGE</div>
      </div>
      <div className="bg-black/80 w-2/4 h-fit px-4 py-9 shadow-2xl text-white flex flex-col gap-6 justify-center items-center rounded-lg">
        {/* Awal Form */}
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-4 items-center w-3/4 "
        >
          <input
            type="text"
            name="identifier"
            id="identifier"
            placeholder="Email / Username"
            className="w-full h-10 p-2 border border-slate-500  focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-1000 rounded-md"
            value={loginForm.identifier}
            onChange={changeHandler}
          />
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              className="w-full h-10 p-2 border border-slate-500 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-1000"
              value={loginForm.password}
              onChange={changeHandler}
            />

            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-slate-500 focus:text-white"
            >
              {showPassword ? (
                <AiOutlineEye className="text-lg" />
              ) : (
                <AiOutlineEyeInvisible className="text-lg" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="bg-blue-950 w-2/3 py-3 rounded-md hover:bg-blue-800 transition-colors duration-300 font-semibold cursor-pointer"
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <AiOutlineLoading className="animate-spin text-lg" />
              </div>
            ) : (
              <div>LOG IN</div>
            )}
          </button>
        </form>
        {/* Akhir Form */}

        {/* Awal dont have an account? */}
        <div className="text-xs">
          Don't have an account?{" "}
          <Link
            href={"/register"}
            className="font-bold text-[#0B98F0] hover:text-white"
          >
            REGISTER
          </Link>
        </div>
        {/* Akhir dont have an account? */}

        {/* Awal by logging in  */}
        <div className="text-xs text-slate-400">
          By logging in, you agree to Traveloka's Privacy policy and Terms &
          Conditions.
        </div>
        {/* Akhir by loggin in */}

        {/* Awal All Rights Reserved */}
        <div className="flex gap-2">
          <Image
            src={"/traveloka_putih.png"}
            alt="Logo Traveloka"
            width={100}
            height={50}
          />
          <div className="text-xs font-light flex items-end text-slate-300">
            All Rights Reserved
          </div>
        </div>
        {/* Akhir All Rights Reserved */}
      </div>
    </div>
  );
}
